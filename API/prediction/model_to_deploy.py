#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 08:30:37 2020

@author: benshd
"""

import pandas as pd

import numpy as np
from keras.layers import Input, LSTM, Bidirectional, Dense, Reshape, concatenate
from keras.models import Model
import tensorflow as tf
import datetime
from datetime import datetime, timedelta
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import os
from scipy.signal import savgol_filter
import pickle
import requests
import io

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'


def clean_noise(df, window_length=57, polyorder=6):
    # df should contain a column of country id and a column of confirmed cases
    ids = df['id'].unique()
    clean = []
    for id in ids:
        clean.append(savgol_filter(
            df[df['id'] == id].confirmed, window_length, polyorder))
    clean = np.array(clean).flatten()
    return clean


def load_Data(n_steps_in, country="QAT", start_date="2020-04-01", data_file_name="prediction/data-1-27-8.csv",
              ):
    # clean the noise in data.
    url = 'https://storage.covid19datahub.io/data-1.csv'
    s = requests.get(url).content
    cdata = pd.read_csv(io.StringIO(s.decode('utf-8')))
    cdata = cdata[cdata['id'] == country]
    cdata = cdata[
        ['id', 'date', 'confirmed', 'school_closing', 'workplace_closing', 'gatherings_restrictions',
         'transport_closing',
         'international_movement_restrictions']]
    cleaned = clean_noise(cdata, 57, 3)
    cdata['confirmed_clean'] = cleaned
    cdata = cdata[cdata['date'] >= start_date]

    # scale the data before returning the data and te scaler
    inital_data = cdata.iloc[0:n_steps_in][[
        'confirmed_clean']].values.reshape(-1, 1).astype(float)

    return inital_data


def load_scaler(scaler_file_name="std_scaler.pkl"):
    # load the scaler
    filehandler = open(scaler_file_name, 'rb')
    std_scaler = pickle.load(filehandler)
    filehandler.close()
    return std_scaler


def get_model(n_steps_in, n_steps_out):
    # model definition
    input_layer = Input(shape=(1, n_steps_in))
    input_layer2 = Input(shape=(1, n_steps_in * 5))
    # cases branch
    x1 = Bidirectional(LSTM(126, return_sequences=True,
                            activation='relu'))(input_layer)
    x1 = Bidirectional(LSTM(16, return_sequences=True, activation='relu'))(x1)
    # x1 = LeakyReLU(alpha=0.9)(x1)
    x1 = Bidirectional(LSTM(16, activation='relu'))(x1)
    x1 = Dense(n_steps_out, activation='linear')(x1)
    # x1 = LeakyReLU(alpha=0.9)(x1)
    x1 = Reshape((1, n_steps_out))(x1)

    # interventions branch
    x2 = Dense(35, activation='linear',
               kernel_initializer="he_normal")(input_layer2)
    # x1 = LeakyReLU(alpha=0.9)(x1)
    x2 = Dense(4, activation='linear')(x2)
    # x1 = LeakyReLU(alpha=0.9)(x1)
    x2 = Dense(1, activation='linear')(x2)
    # x1 = LeakyReLU(alpha=0.9)(x1)
    x2 = Reshape((1, 1))(x2)

    # merging
    combined = concatenate([x1, x2], axis=2)

    z = Dense(16, activation="linear")(combined)
    # z = Dense(2, activation="linear")(z)
    z = Dense(n_steps_out, activation="linear")(z)

    model = Model(inputs=[input_layer, input_layer2], outputs=z)
    return model


'''
x is an array of shape (6,7):
    7: is the time horizon from the past
    6 rows: 1- New Cases 2- School closing 3- Workplace closing 4- Restrictions on gatherings
            5- Close public transport 6- International travel controls
            
            to predict what would happen on April 1st:
            take previous 7 days information --> prediction of April 1st = x1
            for 2nd of April:
                data= [n1 n2 n3 n4 n5 n6 x1] --> prediction is x2
            for 3rd of April
                data [n2,n3,n4,n5,n6,x1,x2] --> prediction is x3

'''


def forecast(model, cases, interventions, n_days, n_steps_in, n_steps_out, scaller):
    predictions = np.array([])
    for i in range(n_days):
        day_prediction = model.predict(
            [cases, interventions[:, i:i + n_steps_in].reshape(1, 1, n_steps_in * 5)])
        if len(predictions) != 0:
            if scaller.inverse_transform(day_prediction) - scaller.inverse_transform([predictions[-1]]) < 0:
                day_prediction[0][0] = predictions[-1]
        predictions = np.append(predictions, day_prediction[0][0])
        # append the prediction in the initiate value
        cases = np.append(cases, day_prediction, axis=2)
        cases = np.delete(cases, list(range(n_steps_out)), axis=2)
    return np.array(predictions)


def predict_period(country, lockdown_measures, from_date=datetime.strptime("2020-08-01", "%Y-%m-%d"),
                   days_to_predict=14):
    model = get_model(14, 1)
    if country == "SAU":
        model.load_weights('prediction/SAU_cases_best_fold_model_14.h5')
        scaler = load_scaler('prediction/SAU_std_scaler.pkl')

    else:
        model.load_weights('prediction/QAT_cases_best_fold_model_14.h5')
        scaler = load_scaler('prediction/QAT_std_scaler.pkl')

    inital_data = load_Data(
        14, country, (from_date - timedelta(days=14)).strftime('%Y-%m-%d'))
    inital_data = scaler.transform(inital_data)

    to_date = from_date + timedelta(days=days_to_predict)
    interventions_columns = ['school_closing', 'workplace_closing', 'gatherings_restrictions', 'transport_closing',
                             'international_movement_restrictions']
    lockdown_data = list(lockdown_measures.values())
    intervention_data = []
    for (i, colName) in enumerate(interventions_columns):
        duration = [max(0, (datetime.strptime(lockdown_data[i]['fromDate'], "%Y-%m-%d") - (
            from_date - timedelta(days=14))).days),
            (min(to_date, datetime.strptime(lockdown_data[i]['toDate'], "%Y-%m-%d")) - max(
                datetime.strptime(lockdown_data[i]['fromDate'], "%Y-%m-%d"), (from_date - timedelta(days=14)))
             ).days,
            max(0, (to_date - datetime.strptime(lockdown_data[i]['toDate'], "%Y-%m-%d")).days)]
        col_data = np.concatenate(
            (np.full(duration[0], 0), np.full(duration[1], lockdown_data[i]['level']), np.full(duration[2], 0)))
        intervention_data.append(col_data)
    intervention_data = np.array(intervention_data)
    forecast_data = forecast(model, np.expand_dims(inital_data.T, 1), intervention_data,
                             days_to_predict, 14, 1, scaler)
    forecast_data = scaler.inverse_transform(forecast_data)
    daily_cases_prediction = np.diff(forecast_data, axis=0)
    return daily_cases_prediction


lockdown_measures = {'schoolClosing': {'level': 3,
                                       'fromDate': '01/04/2020',
                                       'toDate': '31/12/2020', },
                     'workspaceClosing': {'level': 1,
                                          'fromDate': '01/03/2020',
                                          'toDate': '31/12/2020', },
                     'restrictionsOnGatherings': {'level': 3,
                                                  'fromDate': '01/03/2020',
                                                  'toDate': '31/12/2020', },
                     'closePublicTransport': {'level': 0,
                                              'fromDate': '01/03/2020',
                                              'toDate': '31/12/2020', },
                     'internationalTravelControls': {'level': 4,
                                                     'fromDate': '01/03/2020',
                                                     'toDate': '31/12/2020', }}
#
