KNOWLEDGE = [
    {
        "topic": "sizing",
        "keywords": ["panel", "how many", "size", "sizing", "kw", "unit"],
        "answer": "1kW solar produces about 130 kWh/month in Pakistan. Divide monthly units by 130 for system kW, then divide by panel wattage for panel count. Example: 600 units needs about 5kW and 10 panels.",
        "source": "Solar sizing rule: 130 kWh/month per 1kW",
    },
    {
        "topic": "hybrid inverter",
        "keywords": ["hybrid", "inverter"],
        "answer": "A hybrid inverter combines solar, grid and battery. It saves bills, charges batteries and gives backup during load shedding.",
        "source": "Hybrid system guide",
    },
    {
        "topic": "pricing",
        "keywords": ["cost", "price", "5kw", "rs", "lakh"],
        "answer": "Indicative prices: 3kW Rs 3.3-3.8 lakh, 5kW Rs 5.8-6.5 lakh, 10kW Rs 8.5-10 lakh. Actual cost depends on brand, design and installation.",
        "source": "Solar system pricing table",
    },
    {
        "topic": "battery",
        "keywords": ["battery", "lithium", "lifepo4", "lead", "backup"],
        "answer": "LiFePO4 lithium batteries are safer and longer-lasting than lead acid. They suit hybrid and off-grid systems where backup matters.",
        "source": "Battery comparison notes",
    },
    {
        "topic": "net metering",
        "keywords": ["net metering", "net billing", "nepra", "disco"],
        "answer": "Net metering/net billing uses a bi-directional meter and DISCO approval under NEPRA rules. Requirements can change, so verify current rules before applying.",
        "source": "Net billing and NEPRA guide",
    },
    {
        "topic": "maintenance",
        "keywords": ["clean", "maintenance", "service"],
        "answer": "Clean panels with water and a soft brush, keep the inverter ventilated, monitor battery health and arrange annual inspection.",
        "source": "Maintenance guide",
    },
    {
        "topic": "warranty",
        "keywords": ["warranty"],
        "answer": "Panels usually have 12-15 year product warranty and up to 30 year performance warranty. Inverters commonly have 2-5 years, lithium batteries 5-10 years.",
        "source": "Warranty guide",
    },
    {
        "topic": "system types",
        "keywords": ["on-grid", "off-grid", "ongrid", "offgrid", "grid"],
        "answer": "On-grid is lowest cost but no outage backup. Hybrid adds batteries for load shedding. Off-grid is independent and best for remote sites.",
        "source": "System type comparison",
    },
]

FALLBACK = "Ask me about solar panels, inverters, batteries, sizing, pricing, installation, maintenance, warranty, net metering or system type."

def find_answer(message: str):
    q = message.lower()
    best = max(KNOWLEDGE, key=lambda x: sum(k in q for k in x["keywords"]))
    if not any(k in q for k in best["keywords"]):
        return {"answer": FALLBACK, "topic": "general", "sources": []}
    return {"answer": best["answer"], "topic": best["topic"], "sources": [best["source"]]}
