// Central content store for Solar AI Pakistan.
// All figures below come from the project's Pakistan solar reference documents
// and are indicative.

export const SITE = {
  name: "Solar AI Pakistan",
  tagline: "Smart Solar Solutions for Pakistan",
  description:
    "Explore solar products, understand your options, estimate your system requirements, and make informed decisions.",
};

export const HOME_STATS = [
  { value: "130 kWh/month", label: "Approximate generation per 1kW" },
  { value: "22%+", label: "Modern panel efficiency" },
  { value: "25+ Years", label: "Panel lifespan" },
  { value: "10â€“15 Years", label: "Typical inverter lifespan" },
  { value: "4,000â€“6,000+", label: "Battery cycle life" },
  { value: "3â€“5 Years", label: "Approximate payback period" },
];

export const WHY_SOLAR = [
  {
    icon: "wallet",
    title: "Lower Electricity Bills",
    text: "Reduce dependence on grid electricity.",
  },
  {
    icon: "plug",
    title: "Energy Independence",
    text: "Generate your own electricity.",
  },
  {
    icon: "battery",
    title: "Backup Power",
    text: "Hybrid systems can provide backup during outages.",
  },
  { icon: "leaf", title: "Clean Energy", text: "Use renewable solar energy." },
];

export type SystemType = {
  slug: "on-grid" | "hybrid" | "off-grid";
  name: string;
  summary: string;
  points: string[];
  bestFor: string;
};

export const SYSTEM_TYPES: SystemType[] = [
  {
    slug: "on-grid",
    name: "On-Grid",
    summary: "Grid-tied solar with the lowest upfront cost, focused on bill savings.",
    points: [
      "Connected to electricity grid",
      "Usually no battery",
      "Lower upfront cost",
      "Good for bill savings",
      "Does not provide backup during grid outages",
    ],
    bestFor: "Homes and businesses with a stable grid supply that mainly want bill savings.",
  },
  {
    slug: "hybrid",
    name: "Hybrid",
    summary: "Solar, grid and battery combined for both savings and backup.",
    points: [
      "Solar + grid + battery",
      "Provides backup",
      "Suitable for load shedding",
      "Can combine savings and backup",
    ],
    bestFor: "Areas with load shedding where backup power matters as much as savings.",
  },
  {
    slug: "off-grid",
    name: "Off-Grid",
    summary: "A fully independent system for locations without reliable grid access.",
    points: [
      " ndependent of grid",
      "Solar + battery + inverter",
      "Suitable for remote areas",
      "Higher upfront cost",
    ],
    bestFor: "Remote or rural sites with no grid connection.",
  },
];

/* ------------------------------- PANELS -------------------------------- */

export type Panel = {
  brand: string;
  series: string;
  technology: string;
  efficiency: string;
  wattage: string;
  productWarranty: string;
  performanceWarranty: string;
  note: string;
};

export const PANELS: Panel[] = [
  {
    brand: "LONGi Solar",
    series: "Hi-MO Series",
    technology: "Monocrystalline PERC / HPBC",
    efficiency: "Up to ~22.5%",
    wattage: "545W â€“ 620W",
    productWarranty: "12â€“15 years",
    performanceWarranty: "25â€“30 years",
    note: "One of the most widely available high-efficiency panel families in Pakistan.",
  },
  {
    brand: "Jinko Solar",
    series: "Tiger Neo",
    technology: "N-Type TOPCon",
    efficiency: "Up to ~22.8%",
    wattage: "570W â€“ 620W",
    productWarranty: "12â€“15 years",
    performanceWarranty: "30 years",
    note: "N-type cells offer low degradation and strong performance in high temperatures.",
  },
  {
    brand: "Trina Solar",
    series: "Vertex S+",
    technology: "N-Type i-TOPCon",
    efficiency: "Up to ~22.3%",
    wattage: "425W â€“ 700W+",
    productWarranty: "15 years",
    performanceWarranty: "25â€“30 years",
    note: "Compact dual-glass modules that suit limited roof areas.",
  },
  {
    brand: "Canadian Solar",
    series: "HiKu / TOPHiKu",
    technology: "Mono PERC & TOPCon",
    efficiency: "~21â€“22%",
    wattage: "545W â€“ 690W",
    productWarranty: "12â€“15 years",
    performanceWarranty: "25â€“30 years",
    note: "Common choice for residential and commercial rooftop projects.",
  },
  {
    brand: "JA Solar",
    series: "DeepBlue",
    technology: "Mono PERC / N-Type",
    efficiency: "~21â€“22.5%",
    wattage: "545W â€“ 660W",
    productWarranty: "12 years",
    performanceWarranty: "25 years",
    note: "Widely distributed tier-1 modules with good availability.",
  },
  {
    brand: "Risen Energy",
    series: "Titan / Hyper-ion",
    technology: "Mono PERC / HJT",
    efficiency: "~21â€“22%",
    wattage: "550W â€“ 700W",
    productWarranty: "12â€“15 years",
    performanceWarranty: "25â€“30 years",
    note: "High-wattage modules often used for commercial installations.",
  },
  {
    brand: "Astronergy",
    series: "ASTRO N",
    technology: "N-Type TOPCon",
    efficiency: "~21.5â€“22.5%",
    wattage: "570W â€“ 640W",
    productWarranty: "12â€“15 years",
    performanceWarranty: "25â€“30 years",
    note: "Growing presence in the Pakistani market with N-type modules.",
  },
  {
    brand: "Q CELLS",
    series: "Q.PEAK DUO",
    technology: "Q.ANTUM (mono PERC)",
    efficiency: "~20.5â€“21.5%",
    wattage: "480W â€“ 590W",
    productWarranty: "12â€“25 years",
    performanceWarranty: "25 years",
    note: "Known for build quality and long product warranty options.",
  },
];

export const PANEL_PRICES = [
  { panel: "585W", price: "Rs 27,000 â€“ 28,000" },
  { panel: "645W", price: "Rs 31,000 â€“ 32,000" },
  { panel: "720W", price: "~Rs 33,500" },
  { panel: "Approximate", price: "~Rs 45 per watt" },
];

export const PANEL_COMPARISON = [
  {
    model: "Jinko Tiger Neo",
    cellTechnology: "N-Type TOPCon",
    efficiency: "Up to ~22.8%",
    productWarranty: "12â€“15 years",
    performanceWarranty: "30 years",
    bestUse: "High output with low degradation â€” strong all-round rooftop choice.",
  },
  {
    model: "LONGi Hi-MO",
    cellTechnology: "Mono PERC / HPBC",
    efficiency: "Up to ~22.5%",
    productWarranty: "12â€“15 years",
    performanceWarranty: "25â€“30 years",
    bestUse: "Widely available and well supported â€” reliable mainstream option.",
  },
  {
    model: "Trina Vertex S+",
    cellTechnology: "N-Type i-TOPCon",
    efficiency: "Up to ~22.3%",
    productWarranty: "15 years",
    performanceWarranty: "25â€“30 years",
    bestUse: "Compact dual-glass design for smaller or complex roofs.",
  },
];

/* ------------------------------ INVERTERS ------------------------------ */

export type Inverter = {
  brand: string;
  origin: string;
  types: string;
  highlights: string[];
  models: string[];
};

export const INVERTERS: Inverter[] = [
  {
    brand: "Growatt",
    origin: "China",
    types: "On-grid & Hybrid",
    highlights: ["Very common in Pakistan", "Wide service network", "Monitoring app support"],
    models: ["Growatt 6kW"],
  },
  {
    brand: "Huawei",
    origin: "China",
    types: "On-grid & Hybrid",
    highlights: ["Premium build quality", "Strong monitoring platform", "High efficiency"],
    models: ["SUN2000 series"],
  },
  {
    brand: "Sungrow",
    origin: "China",
    types: "On-grid & Hybrid",
    highlights: ["Used in residential and commercial projects", "Reliable long-term performance"],
    models: ["SG / SH series"],
  },
  {
    brand: " nverex",
    origin: "Pakistan",
    types: "Hybrid",
    highlights: ["Locally supported brand", "Popular for load-shedding backup"],
    models: ["Inverex Nitrox 6.6kW"],
  },
  {
    brand: "GoodWe",
    origin: "China",
    types: "On-grid & Hybrid",
    highlights: ["Broad hybrid range", "Battery compatible"],
    models: ["ES / ET series"],
  },
  {
    brand: "Ziewnic",
    origin: "Pakistan market",
    types: "Hybrid",
    highlights: ["Budget-friendly hybrid options", "Common in local retail"],
    models: ["Hybrid series"],
  },
];

export const INVERTER_PRICES = [
  { size: "3kW Hybrid", price: "Rs 80,000 â€“ 230,000" },
  { size: "5kW Hybrid", price: "Rs 95,000 â€“ 375,000" },
  { size: "6â€“8kW Hybrid", price: "Rs 220,000 â€“ 322,000" },
  { size: "10kW Hybrid", price: "Rs 375,000 â€“ 424,000" },
];

export const INVERTER_EXAMPLES = [
  "Inverex Nitrox 6.6kW",
  "MaxPower Voltas 6K-H4",
  "Growatt 6kW",
];

/* ------------------------------ BATTERIES ------------------------------ */

export const BATTERY_TYPES = [
  {
    name: "LiFePO4",
    text: "Safe, long-lasting and suitable for modern solar systems.",
  },
  { name: "Lead Acid", text: "Traditional battery technology." },
];

export const BATTERIES = [
  {
    brand: "Maxpower",
    origin: "Pakistan",
    pricePerKwh: "~Rs 35k â€“ 42k",
    warranty: "5â€“7 years",
    cycleLife: "4,000+",
  },
  {
    brand: "Pylontech",
    origin: "China",
    pricePerKwh: "~Rs 40k â€“ 45k",
    warranty: "10 years",
    cycleLife: "6,000+",
  },
  {
    brand: "BYD",
    origin: "China",
    pricePerKwh: "~Rs 45k â€“ 50k",
    warranty: "10 years",
    cycleLife: "6,000+",
  },
];

/* --------------------------- EXAMPLE SYSTEMS --------------------------- */

export const EXAMPLE_SYSTEMS = [
  {
    name: "Family Home",
    consumption: "600 kWh/month",
    system: "~5kW system",
    panels: "~10 panels",
    inverter: "~6kW inverter",
    battery: "No battery",
  },
  {
    name: "Larger Home",
    consumption: "1000 kWh/month",
    system: "~8.25kW system",
    panels: "~15 panels",
    inverter: "~10kW hybrid inverter",
    battery: "~22.5kWh battery",
  },
  {
    name: "Rural Off-Grid",
    consumption: "300 kWh/month",
    system: "~2.08kW system",
    panels: "~5 panels",
    inverter: "~6kW inverter",
    battery: "Large battery backup",
  },
  {
    name: "Commercial",
    consumption: "5000 kWh/month",
    system: "~37.9kW system",
    panels: "~70 panels",
    inverter: "~45kW inverter",
    battery: "â€”",
  },
  {
    name: "Shop",
    consumption: "400 kWh/month",
    system: "~3.2kW system",
    panels: "~7 panels",
    inverter: "~4kW inverter",
    battery: "~7.5kWh battery",
  },
];

/* ------------------------------ C TY DATA ------------------------------ */

export const CITY_SUN_HOURS = [
  { city: "Karachi", hours: "~5.5â€“5.8", value: 5.65 },
  { city: "Lahore", hours: "~5.0", value: 5.0 },
  { city: "Islamabad", hours: "~5.2â€“5.5", value: 5.35 },
  { city: "Rawalpindi", hours: "~5.2", value: 5.2 },
  { city: "Faisalabad", hours: "~5.5", value: 5.5 },
  { city: "Multan", hours: "~5.5", value: 5.5 },
  { city: "Peshawar", hours: "~5.0â€“5.7", value: 5.35 },
  { city: "Hyderabad", hours: "~5.0", value: 5.0 },
  { city: "Quetta", hours: "~6.0", value: 6.0 },
];

/* ------------------------------- PR C NG ------------------------------- */

export const SYSTEM_PRICING = [
  { system: "3kW", price: "Rs 3.3 â€“ 3.8 Lakh" },
  { system: "5kW", price: "Rs 5.8 â€“ 6.5 Lakh" },
  { system: "10kW", price: "Rs 8.5 â€“ 10.0 Lakh" },
  { system: "15kW On-grid", price: "Rs 14.5 â€“ 18 Lakh" },
  { system: "15kW Hybrid", price: "Rs 23 â€“ 30 Lakh" },
  { system: "20kW", price: "Rs 15 â€“ 16 Lakh" },
];

/* ---------------------------- INSTALLATION ----------------------------- */

export const INSTALL_PROCESS = [
  "Site Survey",
  "Load Assessment",
  "System Design",
  "Equipment",
  "Installation",
  "Wiring",
  "Testing",
  "Commissioning",
];

export const INSTALL_STEPS = [
  {
    title: "Site Survey",
    text: "The site is visited to check shading, orientation and available space before design work begins.",
  },
  {
    title: "Roof Assessment",
    text: "Roof strength, surface type and usable area are checked to confirm how many panels can be mounted safely.",
  },
  {
    title: "Panel Mounting",
    text: "Mounting structures are fixed and panels are installed at a suitable tilt and orientation.",
  },
  {
    title: "Inverter Installation",
    text: "The inverter is mounted in a shaded, ventilated location with safe clearance around it.",
  },
  {
    title: "Battery Installation",
    text: "For hybrid and off-grid systems, batteries are installed in a dry, ventilated space with correct protection.",
  },
  {
    title: "Wiring",
    text: "DC and AC wiring, protection devices and earthing are completed according to system design.",
  },
  {
    title: "Grid Connection",
    text: "For on-grid and hybrid systems, the system is connected to the grid supply through the required protection.",
  },
  {
    title: "Net Billing / Net Metering",
    text: "An application is submitted to the local DISCO for a net metering / net billing connection and a bi-directional meter.",
  },
  {
    title: "Commissioning",
    text: "The complete system is tested, configured and handed over with monitoring set up.",
  },
];

export const MAINTENANCE = [
  {
    title: "Panel Cleaning",
    text: "Panels collect dust which reduces output. Clean regularly with water and a soft brush, preferably early morning or evening, and avoid walking on modules or using harsh chemicals.",
  },
  {
    title: "Inverter Maintenance",
    text: "Keep the inverter ventilated and free of dust, check monitoring data for output drops, and review any error codes promptly.",
  },
  {
    title: "Battery Maintenance",
    text: "Monitor battery health, state of charge and depth of discharge, keep the battery area ventilated and check terminals and connections.",
  },
  {
    title: "Annual Service",
    text: "An annual inspection should cover wiring, connections, protection devices, earthing, inverter, battery and panel condition.",
  },
];

export const WARRANTIES = [
  {
    title: "Solar Panels",
    items: ["12â€“15 year product warranty", "30 year performance warranty", "25+ year lifespan"],
  },
  { title: "Inverters", items: ["2â€“5 year typical warranty", "10â€“15 year lifespan"] },
  {
    title: "Lithium Batteries",
    items: ["5â€“10 year warranty depending on brand", "4,000â€“6,000+ cycles"],
  },
];

/* ----------------------------- KNOWLEDGE ------------------------------- */

export type KnowledgeItem = { q: string; a: string };
export type KnowledgeCategory = { category: string; items: KnowledgeItem[] };

export const KNOWLEDGE: KnowledgeCategory[] = [
  {
    category: "Solar Panels",
    items: [
      {
        q: "What is a solar panel?",
        a: "A solar panel is a module of photovoltaic cells that converts sunlight into DC electricity. Modern panels used in Pakistan are typically monocrystalline, with efficiency above 22% and a lifespan of 25+ years.",
      },
      {
        q: "What is panel efficiency?",
        a: "Efficiency is the percentage of sunlight falling on the panel that is converted into electricity. Modern panels reach 22%+, which means more output from the same roof area.",
      },
      {
        q: "Which panel wattages are common?",
        a: "Commonly available modules include 585W, 645W and 720W units, with indicative pricing of roughly Rs 45 per watt.",
      },
    ],
  },
  {
    category: "Inverters",
    items: [
      {
        q: "What is an inverter?",
        a: "The inverter converts DC electricity from the panels into AC electricity for household or commercial use.  t also manages grid interaction and, in hybrid systems, battery charging.",
      },
      {
        q: "Which inverter brands are available?",
        a: "Growatt, Huawei, Sungrow,  nverex, GoodWe and Ziewnic are available in the Pakistani market. Examples include the  nverex Nitrox 6.6kW, MaxPower Voltas 6K-H4 and Growatt 6kW.",
      },
      {
        q: "How long do inverters last?",
        a: "Typical inverter lifespan is 10â€“15 years, with a common warranty of 2â€“5 years.",
      },
    ],
  },
  {
    category: "Batteries",
    items: [
      {
        q: "Lead acid or lithium?",
        a: "LiFePO4 lithium batteries are safe, long-lasting and suitable for modern solar systems, with 4,000â€“6,000+ cycles and 5â€“10 year warranties. Lead acid is traditional technology with a lower upfront cost and shorter life.",
      },
      {
        q: "What is DoD?",
        a: "Depth of Discharge is how much of a battery's capacity is used before recharging. Lithium batteries tolerate deeper discharge than lead acid, so more of their rated capacity is usable.",
      },
      {
        q: "Do   need batteries?",
        a: "Batteries are required for off-grid systems and for backup during outages in hybrid systems. An on-grid system usually has no battery and does not provide backup during grid outages.",
      },
    ],
  },
  {
    category: "On-grid",
    items: [
      {
        q: "What is an on-grid system?",
        a: "An on-grid system is connected to the electricity grid, usually without a battery.  t has a lower upfront cost and is good for bill savings, but it does not provide backup during grid outages.",
      },
    ],
  },
  {
    category: "Off-grid",
    items: [
      {
        q: "What is an off-grid system?",
        a: "An off-grid system is independent of the grid and uses solar panels, batteries and an inverter.  t suits remote areas but has a higher upfront cost because of the battery bank.",
      },
    ],
  },
  {
    category: "Hybrid",
    items: [
      {
        q: "What is a hybrid system?",
        a: "A hybrid system combines solar, grid and battery.  t provides backup during load shedding and can deliver both savings and backup power.",
      },
      {
        q: "What happens during power cuts?",
        a: "On-grid systems shut down during a grid outage. Hybrid and off-grid systems continue supplying the connected loads from the battery.",
      },
    ],
  },
  {
    category: "Solar Sizing",
    items: [
      {
        q: "What is 1kW?",
        a: "1kW is one kilowatt of power capacity.  n Pakistani conditions, about 1kW of solar generates roughly 130 kWh per month, depending on location and system design.",
      },
      {
        q: "What is kWh?",
        a: "A kilowatt-hour is a unit of energy â€” one kilowatt used for one hour. Electricity bills are measured in kWh (units).",
      },
      {
        q: "How many panels do I need?",
        a: "Divide your monthly consumption by about 130 kWh to estimate the required kW, then divide the system size by the panel wattage. For example, 600 kWh/month needs roughly a 5kW system, about 10 panels and a 6kW inverter.",
      },
    ],
  },
  {
    category: "Installation",
    items: [
      {
        q: "What does installation involve?",
        a: "Site survey, load assessment, system design, equipment supply, panel and inverter installation, battery installation where applicable, wiring, grid connection, testing and commissioning.",
      },
      {
        q: "How long does installation take?",
        a: "A typical residential system is installed within a few days once equipment is on site. Net metering approval from the DISCO takes additional time.",
      },
    ],
  },
  {
    category: "Maintenance",
    items: [
      {
        q: "How often should panels be cleaned?",
        a: "Panels should be cleaned regularly because dust reduces output. Clean with water and a soft brush in the early morning or evening, and never walk on the modules.",
      },
      {
        q: "What does annual service cover?",
        a: "An annual inspection covers wiring, connections, the inverter, the battery and panel condition.",
      },
    ],
  },
  {
    category: "Warranty",
    items: [
      {
        q: "What is panel warranty?",
        a: "Panels usually carry a 12â€“15 year product warranty and up to a 30 year performance warranty, with a lifespan of 25+ years.",
      },
      {
        q: "What warranty do batteries carry?",
        a: "Lithium batteries typically carry 5â€“10 year warranties depending on brand, with 4,000â€“6,000+ cycles.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        q: "How much does a 5kW system cost?",
        a: "An indicative price for a 5kW system is Rs 5.8 â€“ 6.5 Lakh. Actual prices vary by equipment, brand, installation and market conditions.",
      },
      {
        q: "What do panels cost?",
        a: " ndicative panel prices: 585W Rs 27,000â€“28,000, 645W Rs 31,000â€“32,000, 720W about Rs 33,500 â€” roughly Rs 45 per watt.",
      },
    ],
  },
  {
    category: "Net Billing",
    items: [
      {
        q: "What is net billing?",
        a: "Under net billing, exported electricity and imported electricity are valued separately, and the customer is billed on the resulting difference in value rather than a simple unit-for-unit offset.",
      },
      {
        q: "What is net metering?",
        a: "Net metering uses a bi-directional meter to record electricity exported to the grid and imported from it, so surplus solar generation is credited against consumption.",
      },
    ],
  },
  {
    category: "NEPRA",
    items: [
      {
        q: "What is NEPRA?",
        a: "NEPRA is the National Electric Power Regulatory Authority, the regulator that sets the rules and tariffs governing electricity in Pakistan, including distributed generation such as rooftop solar.",
      },
      {
        q: "What is a DISCO?",
        a: "A DISCO is the local electricity distribution company that supplies your area and processes net metering / net billing applications and meter installation.",
      },
    ],
  },
  {
    category: "Government Schemes",
    items: [
      {
        q: "Are there government schemes for solar?",
        a: "Solar policy, incentives and tariff structures in Pakistan are set at federal and provincial level and change over time. Verify current schemes and eligibility with the relevant authority before applying.",
      },
    ],
  },
  {
    category: "Financing",
    items: [
      {
        q: "How is solar financed?",
        a: "Solar systems may be purchased outright or financed through bank or vendor arrangements. With an approximate payback period of 3â€“5 years, the financing term relative to payback is the key comparison.",
      },
    ],
  },
];

export const FAQS: KnowledgeItem[] = [
  {
    q: "What is a solar panel?",
    a: "A module of photovoltaic cells that converts sunlight into DC electricity. Modern panels exceed 22% efficiency and last 25+ years.",
  },
  {
    q: "What is an inverter?",
    a: "The device that converts DC electricity from the panels into usable AC electricity, and manages grid and battery interaction.",
  },
  {
    q: "What is a hybrid system?",
    a: "Solar + grid + battery.  t provides backup during load shedding and combines savings with backup power.",
  },
  {
    q: "On-grid vs off-grid?",
    a: "On-grid is connected to the grid, usually without a battery, with a lower upfront cost but no backup. Off-grid is independent of the grid, uses batteries and costs more upfront.",
  },
  {
    q: "Do   need batteries?",
    a: "Only if you need backup during outages or you are off-grid. On-grid systems normally run without batteries.",
  },
  {
    q: "How many panels do I need?",
    a: "Estimate the system size as monthly consumption divided by ~130 kWh per kW, then divide by panel wattage. 600 kWh/month is roughly 5kW and about 10 panels.",
  },
  {
    q: "What is DoD?",
    a: "Depth of Discharge â€” how much of a battery's capacity is used before recharge. Lithium tolerates deeper discharge than lead acid.",
  },
  {
    q: "What is kWh?",
    a: "A kilowatt-hour, the unit of energy shown on your electricity bill.",
  },
  {
    q: "What is 1kW?",
    a: "One kilowatt of capacity, generating roughly 130 kWh per month in Pakistani conditions.",
  },
  {
    q: "How often should panels be cleaned?",
    a: "Regularly, because dust reduces output. Use water and a soft brush in the early morning or evening.",
  },
  {
    q: "What is panel warranty?",
    a: "Typically a 12â€“15 year product warranty plus a performance warranty up to 30 years.",
  },
  {
    q: "What happens during power cuts?",
    a: "On-grid systems shut down. Hybrid and off-grid systems keep supplying connected loads from the battery.",
  },
  {
    q: "How much does a 5kW system cost?",
    a: "Indicatively Rs 5.8 â€“ 6.5 Lakh, depending on equipment, brand and installation.",
  },
  {
    q: "What is net billing?",
    a: "Exported and imported electricity are valued separately and you are billed on the difference in value.",
  },
  {
    q: "What is NEPRA?",
    a: "The National Electric Power Regulatory Authority, which regulates electricity rules and tariffs in Pakistan.",
  },
  {
    q: "What are the benefits of solar in Pakistan?",
    a: "Lower electricity bills, energy independence, backup power with hybrid systems, and clean renewable energy â€” with an approximate payback of 3â€“5 years.",
  },
  {
    q: "Lead acid vs lithium?",
    a: "LiFePO4 lithium is safe, long-lasting and suited to modern systems (4,000â€“6,000+ cycles). Lead acid is traditional technology with shorter life.",
  },
  {
    q: "What is panel efficiency?",
    a: "The share of incoming sunlight converted into electricity â€” 22%+ on modern panels.",
  },
  {
    q: "How long does installation take?",
    a: "A few days on site for a typical home system, plus additional time for net metering approval.",
  },
];

export const CHAT_SUGGESTIONS = [
  "How many panels do I need?",
  "What is a hybrid inverter?",
  "How much does a 5kW system cost?",
  "Which battery is better?",
  "Calculate my solar system",
];

export const CHAT_RESPONSES: { match: string[]; reply: string }[] = [
  {
    match: ["panel", "how many", "size", "sizing"],
    reply:
      "As a rule of thumb, 1kW of solar generates about 130 kWh per month in Pakistan. Divide your monthly units by 130 to get the system size, then divide by panel wattage. Example: 600 kWh/month â†’ ~5kW â†’ about 10 panels with a ~6kW inverter.",
  },
  {
    match: ["hybrid", "inverter"],
    reply:
      "A hybrid inverter runs solar, grid and battery together.  t supplies your loads from solar, charges the battery and provides backup during load shedding. Common brands here are Growatt, Huawei, Sungrow,  nverex, GoodWe and Ziewnic.  ndicative price for a 5kW hybrid: Rs 95,000 â€“ 375,000.",
  },
  {
    match: ["cost", "price", "5kw", "kitna", "rs"],
    reply:
      "Indicative system pricing: 3kW Rs 3.3â€“3.8 Lakh, 5kW Rs 5.8â€“6.5 Lakh, 10kW Rs 8.5â€“10.0 Lakh. These are indicative only and vary with equipment, brand, installation and market conditions.",
  },
  {
    match: ["battery", "lithium", "lead"],
    reply:
      "LiFePO4 lithium is the safer, longer-lasting choice for modern systems. Maxpower (Pakistan) ~Rs 35kâ€“42k/kWh with 5â€“7 year warranty and 4,000+ cycles; Pylontech and BYD (China) ~Rs 40kâ€“50k/kWh with 10 year warranties and 6,000+ cycles.",
  },
  {
    match: ["calculate", "calculator", "estimate"],
    reply:
      "Open the Solar Calculator page and enter your monthly units, bill, city and backup needs.  t will show an indicative system size, panel count, inverter size and battery requirement for initial planning.",
  },
  {
    match: ["net metering", "net billing", "nepra", "disco"],
    reply:
      "Net metering uses a bi-directional meter to record exported and imported electricity. Under net billing, exports and imports are valued separately and you are billed on the difference. Applications go through your local DISCO under NEPRA rules â€” verify current requirements before applying.",
  },
  {
    match: ["clean", "maintenance", "service"],
    reply:
      "Clean panels regularly with water and a soft brush in the early morning or evening, keep the inverter ventilated and dust-free, monitor battery health, and book an annual inspection of wiring, inverter, battery and panels.",
  },
  {
    match: ["warranty"],
    reply:
      "Panels: 12â€“15 year product warranty, up to 30 year performance warranty, 25+ year lifespan. Inverters: 2â€“5 year warranty, 10â€“15 year lifespan. Lithium batteries: 5â€“10 years depending on brand, 4,000â€“6,000+ cycles.",
  },
  {
    match: ["on-grid", "off-grid", "ongrid", "offgrid", "grid"],
    reply:
      "On-grid: grid-connected, usually no battery, lowest cost, no backup during outages. Hybrid: solar + grid + battery, provides backup during load shedding. Off-grid: fully independent with battery and inverter, suited to remote areas at higher upfront cost.",
  },
];

export const CHAT_FALLBACK =
  "I can help with solar panels, inverters, batteries, system sizing, pricing, installation, maintenance and net metering in Pakistan. Try asking about system size, equipment, backup, warranty, pricing, or net billing.";
