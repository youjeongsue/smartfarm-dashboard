import json
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/env")
async def env():
    pf = pd.read_csv(r'C:\Users\youjeongsue\Desktop\project\smartfarm-sw\smartfarm-dashboard\src\shared\data\hour_data_from_kafka.csv', index_col=0)
    result = pf.to_json(orient="records")
    parsed = json.loads(result)
    return parsed