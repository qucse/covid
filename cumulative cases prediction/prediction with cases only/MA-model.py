import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error, mean_absolute_error
import keras.backend as K


def mean_absolute_percentage_error(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100


def coeff_determination_numpy(y_true, y_pred):
    SS_res = np.sum(np.square(y_true - y_pred))
    SS_tot = np.sum(np.square(y_true - np.mean(y_true)))
    return (1 - SS_res / (SS_tot + K.epsilon()))


# read data
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
X = data.total_positive.values
window = 6
history = [X[i] for i in range(window)]
test = [X[i] for i in range(window, len(X))]
predictions = list()
for t in range(len(test)):
    length = len(history)
    yhat = np.mean([history[i] for i in range(length - window, length)])
    obs = test[t]
    predictions.append(yhat)
    history.append(obs)

test = np.asarray(test)
predictions = np.asarray(predictions)
mse = mean_squared_error(test, predictions)
mae = mean_absolute_error(test, predictions)
dc = coeff_determination_numpy(test, predictions)
test[test == 0] = 0.1  # remove zeros , to prevent zero division
mape = mean_absolute_percentage_error(test, predictions)

print('mse loss  is {:,}'.format(round(mse)))
print('mae loss is {:,}'.format(round(mae)))
print('mape loss  is {:,}'.format(round(mape)))
print('determination coefficient  is {:,}'.format(dc))

plt.plot(test)
plt.plot(predictions, color='red')
plt.show()
