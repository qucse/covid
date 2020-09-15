import pandas as pd
import numpy as np
from keras.callbacks import ReduceLROnPlateau, EarlyStopping, ModelCheckpoint
from keras.layers import LSTM, Bidirectional, Dense, Input, concatenate, Reshape
from keras.models import Model
from keras import backend as K
from tensorflow.keras.metrics import MeanAbsoluteError, MeanAbsolutePercentageError
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import KFold
from sklearn.metrics import mean_squared_error
import time
import tensorflow as tf
import os
from math import sqrt
from utill_code.remove_cases_noise import clean_noise

TRAIN_MODEL = True
n_steps_in, n_steps_out = 30, 1

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'


def print_loss(history, vars):
    for var in vars:
        plt.plot(history.history[var])
    plt.title('Loss over epochs')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(vars, loc='best')
    plt.show()


def forecast(model, cases, interventions, n_days, scaller):
    predictions = np.array([])
    nTrue = np.size(cases, axis=2)
    for i in range(n_days):
        training_npi = interventions[0 + i:nTrue + i]
        day_prediction = model.predict(
            [cases, training_npi.reshape(1, 1, n_steps_in * 5)])
        if len(predictions) != 0:
            if scaller.inverse_transform(day_prediction) - scaller.inverse_transform([predictions[-1]]) < 0:
                day_prediction[0][0] = predictions[-1]
        predictions = np.append(predictions, day_prediction[0][0])
        # append the prediction in the initiate value
        cases = np.append(cases, day_prediction, axis=2)
        cases = np.delete(cases, list(range(n_steps_out)), axis=2)
    return np.array(predictions)


def coeff_determination(y_true, y_pred):
    SS_res = K.sum(K.square(y_true - y_pred))
    SS_tot = K.sum(K.square(y_true - K.mean(y_true)))
    return (1 - SS_res / (SS_tot + K.epsilon()))


def coeff_determination_numpy(y_true, y_pred):
    SS_res = np.sum(np.square(y_true - y_pred))
    SS_tot = np.sum(np.square(y_true - np.mean(y_true)))
    return (1 - SS_res / (SS_tot + K.epsilon()))


# loading the data

ids = ['ARE', 'IDN', 'ISR', 'KWT', 'QAT', 'BLR', 'ARM']

print("training on the follwing counties: {0}".format(ids))

cdata = pd.read_csv('datasets/data-1.csv')
cdata = cdata[cdata['date'] < "2020-09-01"]
cdata = cdata[cdata['date'] >= "2020-03-01"]  # no cases before this date
cdata = cdata[cdata['id'].isin(ids)]
cdata = cdata[
    ['id', 'date', 'confirmed', 'school_closing', 'workplace_closing', 'gatherings_restrictions', 'transport_closing',
     'international_movement_restrictions']]

cleaned = clean_noise(cdata, 57, 3)  # cleaning the noise from the data.
cdata['confirmed_clean'] = cleaned
cdata.confirmed_clean.clip(0, None, inplace=True)

# spliting the data into X and y
arr = []
y_arr = np.array([])
tmp = [[], [], [], [], [], []]
for i in range(len(ids)):
    wdata = cdata.query('id == "{0}"'.format(ids[i]))
    for j in range(len(wdata)):
        if len(tmp[0]) == n_steps_in:
            tmp[0].pop(0)
            tmp[1].pop(0)
            tmp[2].pop(0)
            tmp[3].pop(0)
            tmp[4].pop(0)
            tmp[5].pop(0)
            tmp[0].append(wdata.confirmed_clean.iloc[j])
            tmp[1].append(wdata.school_closing.iloc[j])
            tmp[2].append(wdata.workplace_closing.iloc[j])
            tmp[3].append(wdata.gatherings_restrictions.iloc[j])
            tmp[4].append(wdata.transport_closing.iloc[j])
            tmp[5].append(wdata.transport_closing.iloc[j])
            if (j + n_steps_out) >= len(wdata):
                continue
            arr.append([tmp[0].copy(), tmp[1].copy(), tmp[2].copy(), tmp[3].copy(), tmp[4].copy(), tmp[5].copy()])
            y_arr = np.append(y_arr, wdata.confirmed_clean.iloc[j + 1: j + 1 + n_steps_out].values)
        else:
            tmp[0].append(wdata.confirmed_clean.iloc[j])
            tmp[1].append(wdata.school_closing.iloc[j])
            tmp[2].append(wdata.workplace_closing.iloc[j])
            tmp[3].append(wdata.gatherings_restrictions.iloc[j])
            tmp[4].append(wdata.transport_closing.iloc[j])
            tmp[5].append(wdata.international_movement_restrictions.iloc[j])
    tmp = [[], [], [], [], [], []]
del tmp
x_arr = np.array(arr)
y_arr = y_arr.reshape(len(x_arr), n_steps_out)
del arr

data_np = np.array(x_arr, dtype=float)

# scaling the cases data
std_scaler = StandardScaler()
std_data = std_scaler.fit_transform(data_np[:, 0].flatten().reshape(-1, 1))
std_data = std_data.reshape(1, -1).reshape(len(data_np), n_steps_in)
data_np[:, 0] = std_data
X = data_np
y = std_scaler.transform(y_arr.reshape(-1, 1))
y = y.reshape(len(x_arr), n_steps_out)

# shuffling X and y
rng_state = np.random.get_state()
np.random.shuffle(X)
np.random.set_state(rng_state)
np.random.shuffle(y)

# model definition
input_layer = Input(shape=(1, n_steps_in))
input_layer2 = Input(shape=(1, n_steps_in * 5))

# cases branch
x1 = Bidirectional(LSTM(126, return_sequences=True, activation='relu'))(input_layer)
x1 = Bidirectional(LSTM(16, return_sequences=True, activation='relu'))(x1)
x1 = Bidirectional(LSTM(16, activation='relu'))(x1)
x1 = Dense(n_steps_out, activation='linear')(x1)
x1 = Reshape((1, n_steps_out))(x1)

# interventions branch
x2 = Dense(35, activation='linear', kernel_initializer="he_normal")(input_layer2)
x2 = Dense(4, activation='linear')(x2)
x2 = Dense(1, activation='linear')(x2)
x2 = Reshape((1, 1))(x2)

# merging
combined = concatenate([x1, x2], axis=2)

z = Dense(16, activation="linear")(combined)
z = Dense(n_steps_out, activation="linear")(z)

model = Model(inputs=[input_layer, input_layer2], outputs=z)

model.compile(loss=[tf.keras.losses.MeanSquaredError()], optimizer="adam")

callbacks = [ReduceLROnPlateau(monitor='val_loss', patience=4, verbose=1, factor=0.6),
             EarlyStopping(monitor='val_loss', patience=20),
             ModelCheckpoint(filepath='cases_project_model.h5', monitor='val_loss', save_best_only=True)]

# Define the K-fold Cross Validator

loss_per_fold = np.empty((0, 5))
num_folds = 5
kfold = KFold(n_splits=num_folds, shuffle=True)
fold_no = 1
start_time = time.time()

for train, test in kfold.split(X, y):

    if not TRAIN_MODEL:
        break

    # Generate a print
    print('------------------------------------------------------------------------')
    print('Training for fold {} ...'.format(fold_no))

    # fit model
    cases_train = np.expand_dims(X[train][:, 0], 1)
    interventions_train = X[train][:, 1:, ]
    cases_test = np.expand_dims(X[test][:, 0], 1)
    interventions_test = X[test][:, 1:, ]
    history = model.fit([cases_train, interventions_train.reshape(interventions_train.shape[0], 1, n_steps_in * 5)],
                        y[train],
                        epochs=300, verbose=2, batch_size=1,
                        callbacks=callbacks,
                        validation_data=(
                            [cases_test, interventions_test.reshape(interventions_test.shape[0], 1, n_steps_in * 5)],
                            y[test]))
    # print_loss(history, ['loss', 'val_loss'])
    model.load_weights('cases_project_model.h5')
    # predicting new cases
    y_prediction = model.predict(
        [cases_test, interventions_test.reshape(interventions_test.shape[0], 1, n_steps_in * 5)],
        verbose=2)
    y_prediction = y_prediction.reshape(y_prediction.shape[0], n_steps_out)
    prediction = std_scaler.inverse_transform(y_prediction)
    # prediction = y_prediction
    y_test = std_scaler.inverse_transform(y[test])
    # y_test = y[test]
    plt.scatter(range(len(y_test)), y_test)
    plt.scatter(range(len(prediction)), prediction)
    plt.legend(['true', 'prediction'])
    plt.show()
    mae_metric = MeanAbsoluteError()
    mape_metric = MeanAbsolutePercentageError()
    mse = mean_squared_error(y_test, prediction)
    rmse = sqrt(mse)
    mae = mae_metric(y_test, prediction).numpy()
    mape = mape_metric.update_state(y_test, y_prediction).numpy()
    dc = coeff_determination_numpy(y_test, prediction)
    print('mse loss for fold {} is {:,}'.format(fold_no, round(mse)))
    print('rmse loss for fold {} is {:,}'.format(fold_no, round(rmse)))
    print('mae loss for fold {} is {:,}'.format(fold_no, round(mae)))
    print('mape loss for fold {} is {:,}'.format(fold_no, round(mape)))
    print('determination coefficient for fold {} is {:,}'.format(fold_no, dc))

    loss_per_fold = np.append(loss_per_fold, [[mse, rmse, mae, mape, dc]], axis=0)
    if mse <= np.min(loss_per_fold[:, 0]):
        model.save_weights('cases_best_fold_model.h5')
        print('best fold model found is at fold {}'.format(fold_no))
    fold_no += 1
    print_loss(history, ['loss', 'val_loss'])
if TRAIN_MODEL:
    loss_per_fold = np.asarray(loss_per_fold)
    print('for MSE ------------')
    print(
        "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 0]),
                                                                   np.max(loss_per_fold[:, 0]),
                                                                   np.average(loss_per_fold[:, 0])))

    print('for RMSE ------------')
    print(
        "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 1]),
                                                                   np.max(loss_per_fold[:, 1]),
                                                                   np.average(loss_per_fold[:, 1])))
    print('for MAE ------------')
    print(
        "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 2]),
                                                                   np.max(loss_per_fold[:, 2]),
                                                                   np.average(loss_per_fold[:, 2])))

    print('for MAPE ------------')
    print(
        "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 3]),
                                                                   np.max(loss_per_fold[:, 3]),
                                                                   np.average(loss_per_fold[:, 3])))

    print('for DC ------------')
    print(
        "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 4]),
                                                                   np.max(loss_per_fold[:, 4]),
                                                                   np.average(loss_per_fold[:, 4])))

    print("--- execution took {0} minutes ---".format(round((time.time() - start_time) / 60, 2)))

# best fold model test on whole data

model.load_weights('cases_best_fold_model.h5')  # change this field to the weights file name if model training is False

# testing: predicting cases from September 1st to September 7th

cdata = pd.read_csv('datasets/data-1.csv')
cdata = cdata[cdata['id'].isin(ids)]
cdata = cdata[cdata['date'] >= "2020-03-01"]
cdata = cdata[
    ['id', 'date', 'confirmed', 'school_closing', 'workplace_closing', 'gatherings_restrictions', 'transport_closing',
     'international_movement_restrictions']]
cleaned = clean_noise(cdata, 57, 3)
cdata['confirmed_clean'] = cleaned

true_data = cdata.query(
    'id =="QAT" and date>="2020-08-01"')  # keep one month of true data as initial data to the model.

days_to_predict = 8  # number of days to predict +1 , example if we are predicting 7 days , make this value as 8

inital_data = std_scaler.transform(
    true_data.iloc[0:n_steps_in][['confirmed_clean']].values.reshape(-1, 1).astype(float))

# calculate daily cases from September 1st to September 7th
true_daily = np.diff(true_data[true_data['date'] >= '2020-08-31'][true_data[
                                                                      'date'] <= '2020-09-07'].confirmed)

# generate the interventions arrays , its length should be equal to n_steps_in + days_to_predict
init_interventions = true_data.iloc[0:n_steps_in][
    ['school_closing', 'workplace_closing', 'gatherings_restrictions', 'transport_closing',
     'international_movement_restrictions']].values
npi = np.full((days_to_predict, 5), [3, 2, 3, 2, 3])
interventions = np.append(init_interventions, npi, axis=0)

# making the prediction.
forecast_data = forecast(model, np.expand_dims(inital_data.T, 1), interventions, int(days_to_predict / n_steps_out),
                         std_scaler)
forecast_data = std_scaler.inverse_transform(forecast_data)

daily_cases_prediction = np.diff(forecast_data, axis=0)



mae_metric = MeanAbsoluteError()
mape_metric = MeanAbsolutePercentageError()
mse = mean_squared_error(daily_cases_prediction, true_daily)
rmse = sqrt(mse)
mae = mae_metric(daily_cases_prediction, true_daily).numpy()
mape = mape_metric.update_state(daily_cases_prediction, true_daily).numpy()
dc = coeff_determination_numpy(daily_cases_prediction, true_daily)
print('Testing -----------------------------------')
print('mse loss  is {:,}'.format(round(mse)))
print('rmse loss  is {:,}'.format(round(rmse)))
print('mae loss is {:,}'.format(round(mae)))
print('mape loss  is {:,}'.format(round(mape)))
print('determination coefficient  is {:,}'.format(dc))

plt.plot(daily_cases_prediction)
plt.plot(true_daily)
plt.title('prediction cases vs Actual cases')
plt.ylabel('daily cases')
plt.xlabel('days')
plt.legend(['Prediction', 'Actual'], loc='best')
plt.show()
