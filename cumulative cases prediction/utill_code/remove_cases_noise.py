import pandas as pd
import numpy as np
from scipy.signal import savgol_filter


def clean_noise(df, window_length=57, polyorder=6):
    # df should contain a column of country id and a column of confirmed cases
    ids = df['id'].unique()
    clean = []
    for id in ids:
        clean.append(savgol_filter(df[df['id'] == id].confirmed, window_length, polyorder))
    clean = np.array(clean).flatten()
    return clean
