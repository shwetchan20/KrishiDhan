const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Reverse geocode using OpenStreetMap
 */
async function getLocationDetails(latitude, longitude) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();

        return {
            village:
                data.address.village ||
                data.address.hamlet ||
                data.address.town ||
                data.address.city ||
                "",

            district:
                data.address.county ||
                data.address.state_district ||
                "",

            state:
                data.address.state ||
                "",

            country:
                data.address.country ||
                "India"
        };

    } catch {

        return {
            village: "",
            district: "",
            state: "Maharashtra",
            country: "India"
        };

    }
}

/**
 * Get weather from coordinates
 */
export async function getWeatherByCoords(latitude, longitude) {

    const weatherResponse = await fetch(

        `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m`

    );

    if (!weatherResponse.ok) {

        throw new Error("Unable to fetch weather.");

    }

    const weatherJson = await weatherResponse.json();

    const current = weatherJson.current;

    const location = await getLocationDetails(
        latitude,
        longitude
    );

    return {

        source: "Open-Meteo",

        latitude,

        longitude,

        village: location.village,

        district: location.district,

        state: location.state,

        country: location.country,

        fullLocation:
            `${location.village}, ${location.district}, ${location.state}`,

        temperature: current.temperature_2m,

        humidity: current.relative_humidity_2m,

        rainfall: current.precipitation,

        windSpeed: current.wind_speed_10m,

        diseaseRisk: calculateDiseaseRisk(

            current.temperature_2m,

            current.relative_humidity_2m,

            current.precipitation

        )

    };

}

/**
 * Optional:
 * Weather from city
 */
export async function getWeatherByCity(city) {

    const geo = await fetch(

        `${GEO_URL}?name=${encodeURIComponent(city)}&count=1`

    );

    const geoData = await geo.json();

    if (!geoData.results?.length) {

        throw new Error("City not found.");

    }

    const place = geoData.results[0];

    return getWeatherByCoords(

        place.latitude,

        place.longitude

    );

}

/**
 * Disease estimation
 */
function calculateDiseaseRisk(

    temperature,

    humidity,

    rainfall

) {

    if (

        humidity >= 85 &&

        rainfall >= 5

    ) {

        return "High";

    }

    if (

        humidity >= 65

    ) {

        return "Medium";

    }

    return "Low";

}