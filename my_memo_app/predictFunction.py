import os
import numpy as np
import pandas as pd
import librosa
from pycaret.classification import *


def predictPostAudio(final_model):

    y, sr = librosa.load('./audio/uploaded.wav')
    mfcc = librosa.feature.mfcc(y=y, sr=sr)

    mfcc = np.average(mfcc, axis=1)
    mfcc = mfcc.flatten()
    mfcc = mfcc.tolist()
    mfcc = mfcc[1:13]
    X_data = []
    X_data.append(mfcc)
    y_data = []
    y_data.append('speaker')#speakernum

    X = pd.DataFrame(X_data, columns=[f'mfcc_{n}' for n in range(1, 13)])
    y = pd.DataFrame({'target': y_data})
    df = pd.concat([X, y], axis=1)
    df.to_csv('predict.csv', index=False)  # csvで保存
    df.head()

    predict = pd.read_csv('predict.csv')

    pred = predict_model(final_model, data = predict)

    numbers = pred.prediction_label[0]

    vcAct = {0:"おじいさん", 1:"おばあさん", 2:"少年(白上虎太郎)",
            3:"男の子(月読ショウタ)", 4:"女の子", 5:"少女",
            6:"青年女", 7:"青年男", 8:"おじさん", 9:"おばさん"}

    if numbers in vcAct:
        preVC = vcAct[numbers]
    else:
        print("エラー")

    return preVC