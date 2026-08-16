from fastapi import APIRouter
from .knowledge import find_answer
from .schemas import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(data: ChatRequest):
    return find_answer(data.message)
