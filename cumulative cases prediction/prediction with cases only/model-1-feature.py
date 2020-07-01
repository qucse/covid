import pandas as pd
import numpy as np
from keras import Sequential
from keras.callbacks import ReduceLROnPlateau, EarlyStopping, ModelCheckpoint
from keras.layers import LSTM, Bidirectional, Dense, RepeatVector, TimeDistributed, LeakyReLU
from keras import backend as K
from tensorflow.keras.metrics import MeanAbsoluteError, MeanAbsolutePercentageError
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import KFold
from sklearn.metrics import mean_squared_error
import datetime
import time


def split_sequences(sequences, n_steps_in, n_steps_out):
    X, y = list(), list()
    for i in range(len(sequences)):
        # find the end of this pattern
        end_ix = i + n_steps_in
        out_end_ix = end_ix + n_steps_out
        # check if we are beyond the dataset
        if out_end_ix > len(sequences):
            break
        # gather input and output parts of the pattern
        seq_x, seq_y = sequences[i:end_ix, :], sequences[end_ix:out_end_ix, :]
        X.append(seq_x)
        y.append(seq_y)
    return np.array(X), np.array(y)


def print_loss(history, vars):
    for var in vars:
        plt.plot(history.history[var])
    plt.title('Loss over epochs')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(vars, loc='best')
    plt.show()


def forecast(model, original_data, std_data, from_date, to_date, step):
    f_date = datetime.datetime.strptime(from_date, "%Y-%m-%d").date()
    t_date = datetime.datetime.strptime(to_date, "%Y-%m-%d").date()
    n_days = (t_date - f_date).days - step  # first n days will be used to initiate  the model
    start_index = original_data.query('Date == "{}"'.format(from_date)).index[0]
    init = std_data[start_index:step]
    init = init.reshape(1, init.shape[0], 1)
    predictions = []
    for i in range(n_days):
        day_prediction = model.predict(init)
        predictions.append(day_prediction[0][0])
        # append the prediction in the initiate value
        init = np.append(init, day_prediction.reshape(1, day_prediction.shape[0], day_prediction.shape[1]), axis=1)
        init = np.delete(init, 0, axis=1)
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
data = pd.read_csv('covid-19-cases-in-qatar.csv', delimiter=';')

# data pre processing
data.rename(columns={"Number of New Positive Cases in Last 24 Hrs": "new_positive",
                     "Total Number of Positive Cases to Date": "total_positive",
                     "Number of New Tests in Last 24 Hrs": "new_tests", "Total Number of Tests to Date": "total_tests",
                     "Total Number of Active Cases Undergoing Treatment to Date": "total_active",
                     "Number of New Recovered Cases in Last 24 Hrs": "new_recovered",
                     "Total Number of Recovered Cases to Date": "total_recovered",
                     "Number of New Deaths in Last 24 Hrs": "new_deaths",
                     "Total Number of Deaths to Date": "total_deaths",
                     "Total Number of Acute Cases under Hospital Treatment": "total_HA",
                     "Number of New Acute Hospital Admissions in Last 24 Hrs": "new_HA",
                     "Total Number of Cases under ICU Treatment": "total_ICU",
                     "Number of New ICU Admissions in Last 24 Hrs": "new_ICU"}, inplace=True)
data.drop(['total_HA', 'new_HA', 'total_ICU', 'new_ICU'], axis=1, inplace=True)
data = data.query('Date<"2020-06-15"')
data.sort_values(by=['Date'], inplace=True)
data.reset_index(drop=True, inplace=True)
n_steps_in, n_steps_out = 6, 1
# loading mobility data
# mobility = pd.read_csv('datasets/Google_Global_Mobility_Report.csv')
# mobility = mobility.query('country_region=="Qatar"')
# mobility.drop(['sub_region_1', 'sub_region_2'], axis=1, inplace=True)
# mobility.rename(columns={'date': 'Date'}, inplace=True)
# data_with_mobility = data[['total_positive', 'Date']].merge(mobility, on='Date', how='left')
# data_with_mobility.drop(['country_region_code', 'country_region', 'iso_3166_2_code', 'census_fips_code'], axis=1,
#                         inplace=True)
std_scaler = StandardScaler()
std_data = std_scaler.fit_transform(data['total_positive'].values.reshape(-1,1))

X, y = split_sequences(std_data, n_steps_in, n_steps_out)
y = y.reshape(y.shape[0], y.shape[2])[:, 0].reshape(y.shape[0], 1)

std_scaler_y = StandardScaler()
std_scaler_y.fit(data[['total_positive']])

n_features = X.shape[2]
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, shuffle=True, random_state=43)
# X_val, X_test, y_val, y_test = train_test_split(X_test, y_test, test_size=0.50, shuffle=True, random_state=43)

loss_per_fold = np.empty((0, 4))
num_folds = 10
# Define the K-fold Cross Validator
kfold = KFold(n_splits=num_folds, shuffle=True)
fold_no = 1
start_time = time.time()
for train, test in kfold.split(X, y):
    # model definition
    model = Sequential()
    model.add(Bidirectional(LSTM(265, return_sequences=True), input_shape=(n_steps_in, n_features)))
    model.add(Bidirectional(LSTM(265), input_shape=(n_steps_in, n_features)))
    model.add(Dense(1))
    model.add(LeakyReLU(alpha=0.95))

    model.compile(optimizer='adam', loss='mse', metrics=[coeff_determination, 'mape', 'mae'])

    callbacks = [ReduceLROnPlateau(monitor='val_loss', patience=6, verbose=1, factor=0.6),
                 EarlyStopping(monitor='val_loss', patience=30),
                 ModelCheckpoint(filepath='best_model.h5', monitor='val_loss', save_best_only=True)]

    # Generate a print
    print('------------------------------------------------------------------------')
    print('Training for fold {} ...'.format(fold_no))

    # fit model
    history = model.fit(X[train], y[train], epochs=300, verbose=2, callbacks=callbacks,
                        validation_data=(X[test], y[test]))
    # print_loss(history, ['loss', 'val_loss'])
    model.load_weights('best_model.h5')
    # predicting new cases
    y_prediction = model.predict(X[test], verbose=2)
    prediction = std_scaler_y.inverse_transform(y_prediction)
    y_test = std_scaler_y.inverse_transform(y[test])
    mae_metric = MeanAbsoluteError()
    mape_metric = MeanAbsolutePercentageError()
    mse = mean_squared_error(y_test, prediction)
    mae = mae_metric(y_test, prediction).numpy()
    mape = mape_metric.update_state(y_test, y_prediction).numpy()
    dc = coeff_determination_numpy(y_test, prediction)
    print('mse loss for fold {} is {:,}'.format(fold_no, round(mse)))
    print('mae loss for fold {} is {:,}'.format(fold_no, round(mae)))
    print('mape loss for fold {} is {:,}'.format(fold_no, round(mape)))
    print('determination coefficient for fold {} is {:,}'.format(fold_no, dc))

    loss_per_fold = np.append(loss_per_fold, [[mse, mae, mape, dc]], axis=0)
    if mse <= np.min(loss_per_fold[:, 0]):
        model.save_weights('best_fold_model.h5')
        print('best fold model found is at fold {}'.format(fold_no))
    fold_no += 1
loss_per_fold = np.asarray(loss_per_fold)
print('for MSE ------------')
print(
    "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 0]), np.max(loss_per_fold[:, 0]),
                                                               np.average(loss_per_fold[:, 0])))

print('for MAE ------------')
print(
    "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 1]), np.max(loss_per_fold[:, 1]),
                                                               np.average(loss_per_fold[:, 1])))

print('for MAPE ------------')
print(
    "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 2]), np.max(loss_per_fold[:, 2]),
                                                               np.average(loss_per_fold[:, 2])))

print('for DC ------------')
print(
    "Minimum is : {:,} \nMax is : {:,} \nAvg is : {:,}".format(np.min(loss_per_fold[:, 3]), np.max(loss_per_fold[:, 3]),
                                                               np.average(loss_per_fold[:, 3])))

print("--- execution took {0} minutes ---".format(round((time.time() - start_time) / 60, 2)))


# best fold model test on whole data
model.load_weights('best_fold_model.h5')

y_prediction = model.predict(X, verbose=2)
prediction = std_scaler_y.inverse_transform(y_prediction)
y_test = std_scaler_y.inverse_transform(y)


mae_metric = MeanAbsoluteError()
mape_metric = MeanAbsolutePercentageError()
mse = mean_squared_error(y_test, prediction)
mae = mae_metric(y_test, prediction).numpy()
mape = mape_metric.update_state(y_test, y_prediction).numpy()
dc = coeff_determination_numpy(y_test, prediction)
print('For best model found : ----------------------------------- ')
print('mse loss  is {:,}'.format( round(mse)))
print('mae loss is {:,}'.format( round(mae)))
print('mape loss  is {:,}'.format( round(mape)))
print('determination coefficient  is {:,}'.format(dc))


# # ploting prediciton vs true
# plt.scatter(y=y_test, x=list(range(0, len(y_test))))
# plt.scatter(y=prediction[:, 0], x=list(range(0, len(y_test))))
# plt.title('prediction vs true')
# plt.ylabel('number of cases')
# plt.xlabel('test points')
# plt.legend(['True', 'Prediction'], loc='best')
# plt.xticks(np.arange(0, 19, 1))
# plt.show()

# x_input = X[0]
# x_input = x_input.reshape((1, n_steps_in, n_features))
# yhat = model.predict(x_input, verbose=0)

# forecast_data = forecast(model, data, std_data, '2020-02-29', '2020-06-04', n_steps_in)
# forecast_data = std_scaler.inverse_transform(forecast_data)
# plt.plot(forecast_data)
# plt.plot(data[['total_positive']].values)
# plt.title('prediction cases vs Actual cases')
# plt.ylabel('total cases')
# plt.xlabel('days')
# plt.legend(['Prediction', 'Actual'], loc='best')
# plt.show()
