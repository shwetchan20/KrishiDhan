const DEFAULT_RENT_RATE = {
    hour: 600,
    acre: 1400,
};

export const RENT_RATE_CARD = {
    tractor: { hour: 700, acre: 1600 },
    harvester: { hour: 1200, acre: 2600 },
    tools: { hour: 350, acre: 800 },
    seeds: { hour: 250, acre: 500 },
    irrigation: { hour: 500, acre: 1100 },
    tillage: { hour: 800, acre: 1800 },
};

export function getRentRateByCategory(category) {
    const key = String(category || '').trim().toLowerCase();
    return RENT_RATE_CARD[key] || DEFAULT_RENT_RATE;
}

