// This is our Master List. It contains all Indian farming equipment.
export const toolsData = [
    // --- 1. Land Preparation ---
    {
        id: 'lp-01',
        name: "Rotavator (Rotary Tiller)",
        category: "Land Preparation",
        localName: "Rotavator", // Local name for search
        image: "https://images.unsplash.com/photo-1594494818244-a416d0399a0c?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 'lp-02',
        name: "Mould Board (MB) Plough",
        category: "Land Preparation",
        localName: "Nangar (Plough)", // Local name for search
        image: "https://tiimg.tistatic.com/fp/1/007/574/mild-steel-hydraulic-reversible-plough-for-agriculture-usage-767.jpg"
    },
    {
        id: 'lp-03',
        name: "Cultivator",
        category: "Land Preparation",
        localName: "Cultivator (Pali)", // Local name for search
        image: "https://5.imimg.com/data5/SELLER/Default/2022/9/VK/VP/QO/4636906/agriculture-cultivator.jpg"
    },
    {
        id: 'lp-04',
        name: "Disc Harrow",
        category: "Land Preparation",
        localName: "Disc Harrow",
        image: "https://5.imimg.com/data5/ANDROID/Default/2021/3/TR/GD/QV/125608677/product-jpeg-500x500.jpg"
    },
    {
        id: 'lp-05',
        name: "Laser Land Leveller",
        category: "Land Preparation",
        localName: "Laser Leveller",
        image: "https://rukminim2.flixcart.com/image/850/1000/kvzkosw0/soil-testing-meter/d/a/q/laser-land-leveller-agribolo-original-imag8r7zghayzgz5.jpeg?q=90"
    },

    // --- 2. Sowing & Planting ---
    {
        id: 'sp-01',
        name: "Seed-cum-Fertilizer Drill",
        category: "Sowing",
        localName: "Perani Yantra (Pabhari)", // Sowing Machine
        image: "https://5.imimg.com/data5/SELLER/Default/2023/1/YV/WO/HU/3618487/seed-cum-fertilizer-drill-500x500.png"
    },
    {
        id: 'sp-02',
        name: "Pneumatic Planter",
        category: "Sowing",
        localName: "Planter",
        image: "https://tiimg.tistatic.com/fp/1/007/800/pneumatic-planter-machine-899.jpg"
    },
    {
        id: 'sp-03',
        name: "Super Seeder",
        category: "Sowing",
        localName: "Super Seeder",
        image: "https://5.imimg.com/data5/SELLER/Default/2020/11/NP/QO/OC/4687702/super-seeder-500x500.jpg"
    },

    // --- 3. Crop Care ---
    {
        id: 'cc-01',
        name: "Tractor Mounted Sprayer",
        category: "Crop Care",
        localName: "Tractor Sprayer (Boom Sprayer)",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YO/AR/XU/4629678/tractor-mounted-boom-sprayer-500x500.jpg"
    },
    {
        id: 'cc-02',
        name: "Power Weeder",
        category: "Crop Care",
        localName: "Power Weeder",
        image: "https://m.media-amazon.com/images/I/61g-wH+b+AL.jpg"
    },

    // --- 4. Harvesting ---
    {
        id: 'hv-01',
        name: "Combine Harvester",
        category: "Harvesting",
        localName: "Harvester",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/5/II/VM/WO/2662078/kartar-4000-combine-harvester-500x500.jpg"
    },
    {
        id: 'hv-02',
        name: "Reaper Binder",
        category: "Harvesting",
        localName: "Reaper (Kapani Yantra)",
        image: "https://5.imimg.com/data5/SELLER/Default/2021/2/KO/XQ/DR/25969569/wheat-reaper-binder-500x500.jpg"
    },
    {
        id: 'hv-03',
        name: "Multi-Crop Thresher",
        category: "Harvesting",
        localName: "Thresher (Malani Yantra)",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/5/309995543/KW/QW/SM/3572807/multi-crop-thresher-500x500.jpg"
    },

    // --- 5. Transport ---
    {
        id: 'tr-01',
        name: "Hydraulic Trolley",
        category: "Transport",
        localName: "Tractor Trolley",
        image: "https://5.imimg.com/data5/SELLER/Default/2021/1/UP/QL/UT/2464971/tractor-trolley-500x500.jpg"
    }
];

// Helper function to filter tools by category
export const getToolsByCategory = (category) => {
    return toolsData.filter(tool => tool.category === category);
};