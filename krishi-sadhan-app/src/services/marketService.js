import MARKET_DATA from "../data/marketData";

// ------------------------------------
// Get Market Price
// ------------------------------------

export function getMarketPrice(crop, state = "Maharashtra") {
    if (!crop) {
        return {
            crop: "Unknown",
            market: "Regional Market",
            price: "--",
            unit: "₹",
            trend: "Stable",
            recommendation: "Select a crop to view market prices."
        };
    }

    const key = crop.toLowerCase().trim();

    const cropMarkets = MARKET_DATA[key];

    if (!cropMarkets) {
        return {
            crop,
            market: "Regional Market",
            price: "--",
            unit: "₹",
            trend: "Unknown",
            recommendation: "Market data unavailable."
        };
    }

    const data =
        cropMarkets[state] ||
        cropMarkets["Maharashtra"] ||
        Object.values(cropMarkets)[0];

    let trend = "Stable";

    if (data.price > 6000) {
        trend = "High";
    } else if (data.price > 3000) {
        trend = "Rising";
    } else if (data.price < 1000) {
        trend = "Low";
    }

    let recommendation = "";

    switch (trend) {
        case "High":
            recommendation =
                "Excellent time to sell. Prices are at a strong level.";
            break;

        case "Rising":
            recommendation =
                "Market prices are improving. Holding produce for a few days may increase profit.";
            break;

        case "Low":
            recommendation =
                "Prices are relatively low. Consider storing if possible.";
            break;

        default:
            recommendation =
                "Market prices are stable.";
    }

    return {
        crop: crop.charAt(0).toUpperCase() + crop.slice(1),

        market: data.market,

        price: data.price,

        unit:
            data.price > 100
                ? "₹/quintal"
                : "₹/kg",

        trend,

        recommendation
    };
}