const DEFAULT_RENT_RATE = {
    hour: 600,
    acre: 1400,
};

export const RENT_RATE_CARD = {
    harvester: { acre: 1700 },
    tools: { acre: 1500 },
    blower: { liter: 10, minLiter: 100 },
    trolly: { distance: 60 },
    sowing_machine: { kg: 180 },
    thresing_machine: { ton: 2000, quintal: 200 },
    rotar: { acre: 1200, hour: 900 },
};

export const CATEGORY_LABELS = {
    tractor: 'Tractor',
    harvester: 'Harvester',
    tools: 'Farming Tools',
    blower: 'Blower',
    trolly: 'Trolly',
    sowing_machine: 'Sowing Machine',
    thresing_machine: 'Thresing Machine',
    rotar: 'Rotar',
};

export const RENT_ALLOWED_UNITS = {
    harvester: ['acre'],
    tools: ['acre'],
    blower: ['liter'],
    trolly: ['distance'],
    sowing_machine: ['kg'],
    thresing_machine: ['ton', 'quintal'],
    rotar: ['acre', 'hour'],
};

export function getRentRateByCategory(category) {
    const key = String(category || '').trim().toLowerCase();
    return RENT_RATE_CARD[key] || DEFAULT_RENT_RATE;
}

export function getAllowedRentUnits(category) {
    const key = String(category || '').trim().toLowerCase();
    return RENT_ALLOWED_UNITS[key] || ['hour', 'acre'];
}
