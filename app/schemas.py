from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    message: str = Field(min_length=1)

class ChatResponse(BaseModel):
    answer: str
    topic: str
    sources: list[str] = []

class RecommendationRequest(BaseModel):
    monthly_units: float = Field(gt=0)
    backup_hours: float = 0
    battery_required: bool = False
    panel_watt: int = 585

class RecommendationResponse(BaseModel):
    system_kw: float
    panels: int
    inverter_kw: int
    battery_kwh: float
    system_type: str
    note: str
