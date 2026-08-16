from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .chat import router as chat_router
from .knowledge import KNOWLEDGE
from .recommend import make_recommendation
from .schemas import RecommendationRequest, RecommendationResponse

app = FastAPI(title="Solar AI Pakistan API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/knowledge")
def knowledge():
    return [{"topic": x["topic"], "source": x["source"]} for x in KNOWLEDGE]

@app.post("/recommend", response_model=RecommendationResponse)
def recommend(data: RecommendationRequest):
    return make_recommendation(data)
