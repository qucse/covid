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

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'


def load_Data(n_steps_in, country="QAT", start_date="2020-04-01", data_file_name="gccData.csv"):
    # load data
    cdata = pd.read_csv(data_file_name)
    true_data = cdata.query('id =="{0}" and date>="{1}"'.format(country, start_date))
    std_scaler = StandardScaler()
    std_scaler.fit(cdata.confirmed_clean.values.reshape(-1, 1))
    inital_data = std_scaler.transform(
        true_data.iloc[0:n_steps_in][['confirmed_clean']].values.reshape(-1, 1).astype(float))

    return inital_data, std_scaler


def get_model(n_steps_in, n_steps_out):
    # model definition
    input_layer = Input(shape=(1, n_steps_in))
    input_layer2 = Input(shape=(1, n_steps_in * 5))
    # cases branch
    x1 = Bidirectional(LSTM(126, return_sequences=True, activation='linear'))(input_layer)
    # x1 = Bidirectional(LSTM(16, return_sequences=True, activation='relu'))(x1)
    # x1 = LeakyReLU(alpha=0.9)(x1)
    x1 = Bidirectional(LSTM(16, activation='linear'))(x1)
    x1 = Dense(n_steps_out, activation='linear')(x1)
    # x1 = LeakyReLU(alpha=0.9)(x1)
    x1 = Reshape((1, n_steps_out))(x1)

    # interventions branch
    x2 = LSTM(128, activation='linear', return_sequences=True)(input_layer2)
    # x1 = LeakyReLU(alpha=0.9)(x1)
    x2 = LSTM(16, activation='linear')(x2)
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

    model.compile(loss=[tf.keras.losses.MeanSquaredError()], optimizer="adam")
    return model


model = get_model(14, 1)
model.load_weights('best_fold_model_14_days.h5')

inital_data, scaler = load_Data(14)

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


def forecast(model, cases, interventions, n_days, n_steps_in, n_steps_out):
    predictions = np.array([])
    for i in range(n_days):
        print(i)
        day_prediction = model.predict(
            [cases, interventions[:, 0 + i:n_steps_in + i].reshape(1, 1, n_steps_in * 5)])
        predictions = np.append(predictions, day_prediction[0][0])
        # append the prediction in the initiate value
        cases = np.append(cases, day_prediction, axis=2)
        cases = np.delete(cases, list(range(n_steps_out)), axis=2)
    return np.array(predictions)


def predict_period(country, lockdown_measures, from_date=datetime.strptime("2020-04-01", "%Y-%m-%d"),
                   to_date=datetime.strptime("2020-12-31", "%Y-%m-%d"), inital_data=inital_data):
    days_to_predict = (to_date - from_date).days - 14
    interventions_columns = ['school_closing', 'workplace_closing', 'gatherings_restrictions', 'transport_closing',
                             'international_movement_restrictions']
    lockdown_data = list(lockdown_measures.values())
    intervention_data = []
    for (i, colName) in enumerate(interventions_columns):
        duration = [max(0, (datetime.strptime(lockdown_data[i]['fromDate'], "%d/%m/%Y") - from_date).days),
                    (datetime.strptime(
                        lockdown_data[i]['toDate'], "%d/%m/%Y") - max(
                        datetime.strptime(lockdown_data[i]['fromDate'], "%d/%m/%Y"), from_date)
                     ).days,
                    (to_date - datetime.strptime(lockdown_data[i]['toDate'], "%d/%m/%Y")).days]
        col_data = np.concatenate(
            (np.full(duration[0], 0), np.full(duration[1], lockdown_data[i]['level']), np.full(duration[2], 0)))
        intervention_data.append(col_data)
    intervention_data = np.array(intervention_data)
    forecast_data = forecast(model, np.expand_dims(inital_data.T, 1), intervention_data,
                             days_to_predict, 14, 1)
    forecast_data = scaler.inverse_transform(forecast_data)
    daily_cases_prediction = np.diff(forecast_data, axis=0)
    return daily_cases_prediction

# lockdown_measures = {'schoolClosing': {'level': 3,
#                                        'fromDate': '01/04/2020',
#                                        'toDate': '31/12/2020', },
#                      'workspaceClosing': {'level': 2,
#                                           'fromDate': '01/03/2020',
#                                           'toDate': '31/12/2020', },
#                      'restrictionsOnGatherings': {'level': 4,
#                                                   'fromDate': '01/03/2020',
#                                                   'toDate': '31/12/2020', },
#                      'closePublicTransport': {'level': 2,
#                                               'fromDate': '01/03/2020',
#                                               'toDate': '31/12/2020', },
#                      'internationalTravelControls': {'level': 2,
#                                                      'fromDate': '01/03/2020',
#                                                      'toDate': '31/12/2020', }}
#
# prediction = predict_period('QAT', lockdown_measures , to_date=datetime.strptime("2020-12-31", "%Y-%m-%d"))
