#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 08:30:37 2020

@author: benshd
"""


import pandas as pd
from sklearn.utils import shuffle
import numpy as np
from keras.layers import Input, LSTM,Bidirectional,Dense, LeakyReLU
from keras.models import Model
from keras.callbacks import ModelCheckpoint, ReduceLROnPlateau, EarlyStopping
import tensorflow as tf
import matplotlib.pyplot as plt
import datetime
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error


config = tf.ConfigProto()
config.gpu_options.allow_growth=True
sess = tf.Session(config=config)


extra_col = ['C1_School closing',
       'C2_Workplace closing',
             #'C3_Cancel public events',
       'C4_Restrictions on gatherings', 
             'C5_Close public transport',
       #'C6_Stay at home requirements', 
    #'C7_Restrictions on internal movement',
       'C8_International travel controls'
            ]

scaler= StandardScaler()


mydateparser = lambda x: pd.datetime.strptime(x, "%m/%d/%Y")
date = datetime.datetime.strptime("06/14/2020", "%m/%d/%Y")


df_gcc = pd.read_csv('GCC.csv',parse_dates=['date'], date_parser=mydateparser)
df_gcc = df_gcc[df_gcc.date <= date]
df_gcc = df_gcc[['location','date','total_cases']]
df_gcc.rename(columns = {'location':'Country'}, inplace = True) 
df_gcc.rename(columns = {'date':'Date'}, inplace = True) 
df_gcc.rename(columns = {'total_cases':'ConfirmedCases'}, inplace = True) 


mydateparser1 = lambda x: pd.datetime.strptime(x, "%Y-%m-%d")
df = pd.read_csv('q_data.csv',index_col=0,parse_dates=['Date'], date_parser=mydateparser1)

df = df[ ['Country', 'Date'] +  extra_col]


date_11_5 = datetime.datetime.strptime("05/11/2020", "%m/%d/%Y")
df_gcc = pd.merge(df_gcc,df,how="left", on=['Country','Date'])
x_11_5 = df_gcc.loc[df_gcc['Date'] == date_11_5]
for col in extra_col:
    for c in df_gcc.Country.unique():
        val = x_11_5[x_11_5.Country == c][col].iloc[0]
        df_gcc.loc[df_gcc.Country == c,col] = df_gcc.loc[df_gcc.Country == c,col].fillna(val)
        

df_gcc['confirmed_cases_scaled'] = scaler.fit_transform(np.expand_dims(df_gcc['ConfirmedCases'].values,1))

#%%
data = []

# window: number of days used from the past to predict the future
window = 6 
df_per_country = list(df_gcc.groupby('Country'))
next_day_confirmed = []
for lst in df_per_country:
    
    df_temp = lst[1]
    
    for i in range(len(df_temp)-window):
    
        cases = df_temp.confirmed_cases_scaled.iloc[i:i+window].values.tolist()
        extra = df_temp[extra_col].iloc[i:i+window].transpose().values.tolist()
        extra.insert(0,cases)
        data.append(extra)
        next_day_confirmed.append(df_temp.confirmed_cases_scaled.iloc[i+window])

trend_list = []
trend_df = pd.DataFrame()
trend_df['confirmed_cases'] = data
trend_df['next_day_confirmed_cases'] = next_day_confirmed


# exclude some zero cases
i=0
temp_df = pd.DataFrame()
sum_ = sum(trend_df.confirmed_cases.iloc[0][0])
for idx,row in trend_df.iterrows():
    if sum(row.confirmed_cases[0]) != sum_:
        temp_df = temp_df.append(row)
    else:
        if i<25:
            temp_df = temp_df.append(row)
            i+=1
trend_df = temp_df

trend_df = shuffle(trend_df,random_state=33)
#%% train test split
train_ratio = 0.85
train_df = trend_df.iloc[:int(len(trend_df)*train_ratio),:]
test_df = trend_df.iloc[int(len(trend_df)*train_ratio):,:]        

x_train = np.array([np.array(x) for x in train_df.confirmed_cases])
y_train = train_df.next_day_confirmed_cases.values

x_test = np.array([np.array(x) for x in test_df.confirmed_cases])

y_test = test_df.next_day_confirmed_cases.values

#%% model

input_layer = Input(shape=x_train.shape[1:])
x = Bidirectional(LSTM(256, return_sequences=True,))(input_layer)
x = Bidirectional(LSTM(64))(x)
x = Dense(1)(x)
x = LeakyReLU(alpha = 0.1)(x)
model = Model(input_layer, x)

callbacks = [ReduceLROnPlateau(monitor='val_loss', patience=4, verbose=1, factor=0.6),
             EarlyStopping(monitor='val_loss', patience=20),
             ModelCheckpoint(filepath='project_model.h5', monitor='val_loss', save_best_only=True)]
model.compile(loss=[tf.keras.losses.MeanSquaredError()], optimizer="adam")
history = model.fit([x_train], [y_train], 
          epochs = 500, 
          batch_size = 4, 
          validation_data=([x_test],  [y_test]),
                   callbacks=callbacks)
#%% plotting train and test loss

plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Loss over epochs')  
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Train', 'Validation'], loc='best')
plt.show()

model.load_weights("project_model.h5")
predictions = model.predict(x_test)

pred_inv = scaler.inverse_transform(predictions).clip(min = 0)
y_test_inv = scaler.inverse_transform(y_test)
display_limit = 30
for pred_cases, exp_cases in zip(pred_inv[:display_limit], y_test_inv[:display_limit]):
    print("================================================")
    print("Expected cases:", exp_cases, " Prediction:", pred_cases[0] )

print(mean_squared_error(y_test_inv,pred_inv))
## Best Model Bi-LSTM-256 -> Bi-LSTM-64 --> leaky_relu_alpha_0.095
#%% Cross validation
from sklearn.model_selection import KFold

X = np.concatenate([x_train,x_test],axis=0)
Y = np.concatenate([y_train,y_test],axis=0)

loss_per_fold = []

num_folds = 10
kfold = KFold(n_splits=num_folds, shuffle=True)
fold_i = 1
for train,test in kfold.split(X,Y):
    
    
    input_layer = Input(shape=x_train.shape[1:])
    x = Bidirectional(LSTM(256, return_sequences=True,))(input_layer)
    x = Bidirectional(LSTM(128))(x)
    x = Dense(1)(x)
    x = LeakyReLU(alpha = 0.1)(x)
    model = Model(input_layer, x)
    
    callbacks = [ReduceLROnPlateau(monitor='val_loss', patience=4, verbose=1, factor=0.6),
             EarlyStopping(monitor='val_loss', patience=20),
             ModelCheckpoint(filepath='project_model'+str(fold_i)+'.h5', monitor='val_loss', save_best_only=True)]
    
    
    model.compile(loss=[tf.keras.losses.MeanSquaredError()], optimizer="adam")
    
    print('------------------------------------------------------------------------')
    print(f'Training for fold {fold_i} ...')

    history = model.fit(X[train], Y[train], 
              epochs = 500, 
              batch_size = 4, 
              validation_data=(X[test],  Y[test]),
                       callbacks=callbacks)
    model.load_weights('project_model'+str(fold_i)+'.h5')
    predictions = model.predict(X[test])
    
    pred_inv = scaler.inverse_transform(predictions).clip(min = 0)
    y_test_inv = scaler.inverse_transform(Y[test])
    loss_per_fold.append(mean_squared_error(y_test_inv,pred_inv))
    
    fold_i += 1
    
 #%%   loading the best model
model.load_weights('project_model10.h5')
predictions = model.predict(X)

pred_inv = scaler.inverse_transform(predictions).clip(min = 0)
y_test_inv = scaler.inverse_transform(Y)
display_limit = 30
for pred_cases, exp_cases in zip(pred_inv[:display_limit], y_test_inv[:display_limit]):
    print("================================================")
    print("Expected cases:", exp_cases, " Prediction:", pred_cases[0] )


print(mean_squared_error(y_test_inv,pred_inv))
#%% Qatar Data
model.load_weights('project_best_qatar.h5')
df_qatar = df_gcc[df_gcc.Country == 'Qatar']

q_cases = []
q_extra = []
q_next_day_confirmed = []
q_data = []
q_dates = []

for i in range(len(df_qatar)-window):

    q_cases = df_qatar.confirmed_cases_scaled.iloc[i:i+window].values.tolist()
    q_extra = df_qatar[extra_col].iloc[i:i+window].transpose().values.tolist()
    q_extra.insert(0,q_cases)
    q_data.append(q_extra)
    q_next_day_confirmed.append(df_qatar.confirmed_cases_scaled.iloc[i+window])
    q_dates.append(df_qatar.Date.iloc[i+window])
    




   
q_data = np.array(q_data)
q_next_day_confirmed = np.array(q_next_day_confirmed)
q_pred = model.predict(q_data)  

q_pred_inv = scaler.inverse_transform(q_pred).clip(min = 0)
q_y_test_inv = scaler.inverse_transform(q_next_day_confirmed)  

for pred_cases, exp_cases in zip(q_pred_inv[-display_limit:], q_y_test_inv[-display_limit:]):
    print("================================================")
    print("Expected cases:", exp_cases, " Prediction:", pred_cases[0] )
    
print(mean_squared_error(q_y_test_inv,q_pred_inv))    
    
#%% Plotting 
from matplotlib.pyplot import figure
figure(num=None, figsize=(24, 14), dpi=80, facecolor='w', edgecolor='k')

_,ax = plt.plot(range(len(q_y_test_inv)),q_y_test_inv,range(len(q_y_test_inv)),q_pred_inv,'r', linewidth=2)
plt.xticks(range(len(q_y_test_inv))[::4],q_dates[::4], rotation='vertical')
plt.title('Cumulative number of cases in Qatar: Actual vs Predicted',fontsize = 20)
plt.xlabel('Day',fontsize = 20)
plt.ylabel('Cumulative Number of cases',fontsize = 20)
plt.legend(['Actual','Predicted'],fontsize = 18)


#


