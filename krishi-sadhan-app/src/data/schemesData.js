const schemes = [

    {
        id: 1,
        name: "PM-KISAN",
        type: "Central",
        description: "Income support scheme for farmer families.",
        benefit: "₹6,000/year in 3 installments.",
        eligibility: "All eligible landholding farmers.",
        documents: ["Aadhaar", "Bank Passbook", "Land Record"],
        official: "https://pmkisan.gov.in"
    },

    {
        id: 2,
        name: "PM Fasal Bima Yojana",
        type: "Central",
        description: "Crop insurance against drought, flood, pest and diseases.",
        benefit: "Low premium crop insurance.",
        eligibility: "Farmers growing notified crops.",
        documents: ["Aadhaar", "Bank Account", "Land Record"],
        official: "https://pmfby.gov.in"
    },

    {
        id: 3,
        name: "Kisan Credit Card",
        type: "Central",
        description: "Provides low-interest agricultural loans.",
        benefit: "Affordable crop loan and working capital.",
        eligibility: "Farmers, dairy and fisheries.",
        documents: ["Aadhaar", "PAN", "Land Record"],
        official: "https://kcc.pmkisan.gov.in"
    },

    {
        id: 4,
        name: "Soil Health Card",
        type: "Central",
        description: "Free soil testing and fertilizer recommendation.",
        benefit: "Improves productivity while reducing fertilizer cost.",
        eligibility: "All farmers.",
        documents: ["Aadhaar", "Land Record"],
        official: "https://soilhealth.dac.gov.in"
    },

    {
        id: 5,
        name: "PM Krishi Sinchai Yojana",
        type: "Central",
        description: "Micro irrigation subsidy scheme.",
        benefit: "Supports drip and sprinkler irrigation.",
        eligibility: "All farmers.",
        documents: ["Aadhaar", "Land Record", "Bank Account"],
        official: "https://pmksy.gov.in"
    },

    {
        id: 6,
        name: "e-NAM",
        type: "Central",
        description: "National online agriculture market.",
        benefit: "Better price discovery and online selling.",
        eligibility: "Registered farmers.",
        documents: ["Aadhaar", "Bank Account"],
        official: "https://www.enam.gov.in"
    },

    {
        id: 7,
        name: "PM Kisan Maandhan",
        type: "Central",
        description: "Farmer pension scheme.",
        benefit: "₹3,000 monthly pension after age 60.",
        eligibility: "Farmers aged 18-40 years.",
        documents: ["Aadhaar", "Bank Account"],
        official: "https://maandhan.in"
    },

    {
        id: 8,
        name: "Agriculture Infrastructure Fund",
        type: "Central",
        description: "Financial assistance for warehouses and storage.",
        benefit: "Interest subsidy and credit guarantee.",
        eligibility: "Farmers, FPOs and PACS.",
        documents: ["Aadhaar", "Project Report"],
        official: "https://agriinfra.dac.gov.in"
    },

    {
        id: 9,
        name: "National Mission on Sustainable Agriculture",
        type: "Central",
        description: "Promotes climate resilient farming.",
        benefit: "Financial assistance for sustainable farming.",
        eligibility: "All farmers.",
        documents: ["Aadhaar", "Land Record"],
        official: "https://nmsa.dac.gov.in"
    },

    {
        id: 10,
        name: "Sub-Mission on Agricultural Mechanization",
        type: "Central",
        description: "Subsidy for farm machinery.",
        benefit: "40–50% subsidy on tractors and implements.",
        eligibility: "Eligible farmers.",
        documents: ["Aadhaar", "Land Record", "Quotation"],
        official: "https://agrimachinery.nic.in"
    },

    {
        id: 11,
        name: "Namo Shetkari Mahasanman Nidhi",
        type: "Maharashtra",
        description: "Additional financial assistance for Maharashtra farmers.",
        benefit: "₹6,000 annually in addition to PM-KISAN.",
        eligibility: "PM-KISAN beneficiaries in Maharashtra.",
        documents: ["Aadhaar", "Bank Account"],
        official: "https://nsmny.mahait.org"
    },

    {
        id: 12,
        name: "MahaDBT Farmer Scheme",
        type: "Maharashtra",
        description: "Single portal for all agriculture subsidies.",
        benefit: "Machinery, irrigation and seed subsidies.",
        eligibility: "Maharashtra farmers.",
        documents: ["Aadhaar", "Land Record"],
        official: "https://mahadbt.maharashtra.gov.in"
    },

    {
        id: 13,
        name: "Magel Tyala Shettale",
        type: "Maharashtra",
        description: "Farm pond subsidy scheme.",
        benefit: "Water conservation support.",
        eligibility: "Eligible Maharashtra farmers.",
        documents: ["Aadhaar", "Land Record"],
        official: "https://mahadbt.maharashtra.gov.in"
    },

    {
        id: 14,
        name: "Nanaji Deshmukh Krishi Sanjivani (PoCRA)",
        type: "Maharashtra",
        description: "Climate resilient agriculture project.",
        benefit: "Financial support for drought-prone farming.",
        eligibility: "Farmers in selected districts.",
        documents: ["Aadhaar", "Land Record"],
        official: "https://mahapocra.gov.in"
    },

    {
        id: 15,
        name: "Bhausaheb Fundkar Orchard Plantation Scheme",
        type: "Maharashtra",
        description: "Promotes horticulture plantations.",
        benefit: "Subsidy for orchard establishment.",
        eligibility: "Eligible horticulture farmers.",
        documents: ["Aadhaar", "Land Record"],
        official: "https://mahadbt.maharashtra.gov.in"
    }

];

export default schemes;