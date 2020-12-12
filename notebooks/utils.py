#환경 변수(FATR_CODE), 총 359개
#env_codes에서 code name을 얻는 함수
import pandas as pd

def getCode(code):
    env_codes = pd.read_csv('data/codes.csv', index_col=0)
    index = env_codes[env_codes['FATR_CODE']==code].index[0]
    return env_codes[env_codes['FATR_CODE']==code]['FATR_NAME'][index]