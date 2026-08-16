from math import ceil
from .schemas import RecommendationRequest

def make_recommendation(data: RecommendationRequest):
    system_kw = round(data.monthly_units / 130, 2)
    panels = ceil(system_kw * 1000 / data.panel_watt)
    inverter_kw = ceil(system_kw * 1.2)
    battery_kwh = round((data.monthly_units / 30 / 24) * data.backup_hours * 1.3, 1) if data.battery_required or data.backup_hours else 0
    system_type = "Hybrid" if battery_kwh else "On-grid"
    return {
        "system_kw": system_kw,
        "panels": panels,
        "inverter_kw": inverter_kw,
        "battery_kwh": battery_kwh,
        "system_type": system_type,
        "note": "Initial estimate only. Confirm final design with a professional site survey.",
    }
