import pandas as pd
import numpy as np
import itertools
from sklearn.metrics import mean_squared_error

cdata = pd.read_csv('../datasets/intervention_cluster.csv')

ivsc = [cdata.school_closing.unique().sum(), cdata.workplace_closing.unique().sum(),
        cdata.gatherings_restrictions.unique().sum(), cdata.transport_closing.unique().sum(),
        cdata.international_movement_restrictions.unique().sum()]

ids = ['ARE', 'AZE', 'BEN', 'BHR', 'GEO', 'HRV', 'IDN', 'ISR', 'ITA',
       'KWT', 'LBN', 'MEX', 'MOZ', 'NOR', 'OMN', 'PAK', 'QAT', 'ROU',
       'SYC', 'TCD']

ids.remove('QAT')

all_combinations = []
for r in range(len(ids) + 1):
    combinations_object = itertools.combinations(ids, r)
    combinations_list = list(combinations_object)
    all_combinations += combinations_list
len(all_combinations)

all_iv_comb = []
sample_size = []
qat = cdata[cdata['id'] == "QAT"]
errors = []
for combination in all_combinations:
    combination += ('QAT',)
    wdata = cdata[cdata['id'].isin(combination)]
    wivsc = [wdata.school_closing.unique().sum(), wdata.workplace_closing.unique().sum(),
             wdata.gatherings_restrictions.unique().sum(), wdata.transport_closing.unique().sum(),
             wdata.international_movement_restrictions.unique().sum()]
    if sum(wivsc) == sum(ivsc):
        all_iv_comb.append(combination)
        sample_size.append(len(wdata))
        mse = [mean_squared_error(qat.confirmed_clean, wdata[wdata['id'] == ids[i]]) for i in range(len(ids))]
        errors.append(mse)
    print("score for combination {0} is {1} : {2}".format(combination, wivsc, sum(wivsc)))

pd.DataFrame(data={"comb": all_iv_comb, "sample_size": sample_size}).to_csv('../datasets/county_list_with_all_NPI.csv')
