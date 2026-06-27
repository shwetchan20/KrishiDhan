const crops = [

    {
        name: "Soybean",

        season: "Kharif",

        idealTemperature: "22°C - 32°C",

        idealRainfall: "500 - 900 mm",

        soil: "Well-drained black cotton soil",

        humidity: "60 - 80%",

        seedVarieties: [
            "JS-335",
            "MAUS-71",
            "MAUS-162"
        ],

        seedRate: "30-35 kg/acre",

        sowingDepth: "3-5 cm",

        rowSpacing: "45 cm",

        fertilizer: "NPK 30:60:30 kg/ha",

        irrigation: "Only during long dry spells",

        diseases: [
            "Yellow Mosaic",
            "Rust",
            "Stem Fly"
        ],

        states: [
            "Maharashtra",
            "Madhya Pradesh"
        ]
    },

    {
        name: "Cotton",

        season: "Kharif",

        idealTemperature: "21°C - 30°C",

        idealRainfall: "600 - 1000 mm",

        soil: "Deep black soil",

        humidity: "50 - 70%",

        seedVarieties: [
            "RCH-2 Bt",
            "Bunny Bt",
            "Ankur 3028"
        ],

        seedRate: "1-1.5 kg/acre",

        sowingDepth: "2-3 cm",

        rowSpacing: "90 cm",

        fertilizer: "NPK 80:40:40 kg/ha",

        irrigation: "Every 10-12 days",

        diseases: [
            "Pink Bollworm",
            "Leaf Curl Virus"
        ],

        states: [
            "Maharashtra",
            "Gujarat"
        ]
    },

    {
        name: "Tomato",

        season: "Rabi / Summer",

        idealTemperature: "20°C - 30°C",

        idealRainfall: "400 - 600 mm",

        soil: "Loamy soil",

        humidity: "60 - 70%",

        seedVarieties: [
            "Arka Rakshak",
            "Abhinav",
            "Pusa Ruby"
        ],

        seedRate: "100-120 g/acre",

        sowingDepth: "1-2 cm",

        rowSpacing: "60 cm",

        fertilizer: "NPK 100:50:50 kg/ha",

        irrigation: "Every 4-5 days",

        diseases: [
            "Early Blight",
            "Wilt",
            "Leaf Curl"
        ],

        states: [
            "India"
        ]
    },

    {
        name: "Wheat",

        season: "Rabi",

        idealTemperature: "15°C - 25°C",

        idealRainfall: "500 - 700 mm",

        soil: "Clay loam",

        humidity: "50 - 60%",

        seedVarieties: [
            "HD-2967",
            "Lok-1"
        ],

        seedRate: "40-50 kg/acre",

        sowingDepth: "4-5 cm",

        rowSpacing: "22 cm",

        fertilizer: "NPK 120:60:40 kg/ha",

        irrigation: "Every 20 days",

        diseases: [
            "Rust",
            "Loose Smut"
        ],

        states: [
            "Punjab",
            "Haryana",
            "Maharashtra"
        ]
    },

    {
        name: "Rice",

        season: "Kharif",

        idealTemperature: "20°C - 35°C",

        idealRainfall: "1000 - 2000 mm",

        soil: "Clay soil",

        humidity: "70 - 90%",

        seedVarieties: [
            "Swarna",
            "IR64"
        ],

        seedRate: "20-25 kg/acre",

        sowingDepth: "2 cm",

        rowSpacing: "20 cm",

        fertilizer: "NPK 100:50:50 kg/ha",

        irrigation: "Continuous water level",

        diseases: [
            "Blast",
            "Brown Spot"
        ],

        states: [
            "India"
        ]
    },

    {
        name: "Maize",

        season: "Kharif",

        idealTemperature: "18°C - 30°C",

        idealRainfall: "500 - 800 mm",

        soil: "Well-drained loamy soil",

        humidity: "60 - 70%",

        seedVarieties: [
            "HQPM-1",
            "DHM-117"
        ],

        seedRate: "8-10 kg/acre",

        sowingDepth: "4-5 cm",

        rowSpacing: "60 cm",

        fertilizer: "NPK 120:60:40 kg/ha",

        irrigation: "Every 8-10 days",

        diseases: [
            "Leaf Blight",
            "Downy Mildew"
        ],

        states: [
            "India"
        ]
    },

    {
        name: "Sugarcane",

        season: "Spring",

        idealTemperature: "20°C - 35°C",

        idealRainfall: "1000 - 1500 mm",

        soil: "Deep fertile loam",

        humidity: "70 - 80%",

        seedVarieties: [
            "Co-86032",
            "CoM-0265"
        ],

        seedRate: "35000 setts/ha",

        sowingDepth: "10 cm",

        rowSpacing: "90 cm",

        fertilizer: "NPK 250:115:115 kg/ha",

        irrigation: "Every 7-10 days",

        diseases: [
            "Red Rot",
            "Wilt"
        ],

        states: [
            "Maharashtra",
            "UP"
        ]
    },

    {
        name: "Onion",

        season: "Rabi",

        idealTemperature: "15°C - 30°C",

        idealRainfall: "350 - 550 mm",

        soil: "Loamy soil",

        humidity: "60%",

        seedVarieties: [
            "N-53",
            "Bhima Super"
        ],

        seedRate: "4-5 kg/acre",

        sowingDepth: "1 cm",

        rowSpacing: "15 cm",

        fertilizer: "NPK 100:50:50 kg/ha",

        irrigation: "Every 5-6 days",

        diseases: [
            "Purple Blotch",
            "Stemphylium"
        ],

        states: [
            "Maharashtra"
        ]
    },

    {
        name: "Tur",

        season: "Kharif",

        idealTemperature: "25°C - 35°C",

        idealRainfall: "600 - 1000 mm",

        soil: "Black soil",

        humidity: "60-70%",

        seedVarieties: [
            "BSMR-736",
            "ICPH-2671"
        ],

        seedRate: "8 kg/acre",

        sowingDepth: "4 cm",

        rowSpacing: "60 cm",

        fertilizer: "NPK 25:50:0 kg/ha",

        irrigation: "Only during flowering",

        diseases: [
            "Wilt",
            "Sterility Mosaic"
        ],

        states: [
            "Maharashtra"
        ]
    },

    {
        name: "Chilli",

        season: "Kharif / Rabi",

        idealTemperature: "20°C - 30°C",

        idealRainfall: "600 - 900 mm",

        soil: "Well-drained loamy soil",

        humidity: "60%",

        seedVarieties: [
            "Byadgi",
            "Pusa Jwala"
        ],

        seedRate: "300 g/acre",

        sowingDepth: "1 cm",

        rowSpacing: "45 cm",

        fertilizer: "NPK 75:40:40 kg/ha",

        irrigation: "Weekly",

        diseases: [
            "Anthracnose",
            "Leaf Curl"
        ],

        states: [
            "India"
        ]
    }

];

export default crops;