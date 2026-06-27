const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function askAI({
    question,
    weather,
    market,
    schemes,
    crops,
    location,
    state = "Maharashtra"
}) {

    const prompt = `
You are KrishiDhan AI,
a senior Agriculture Extension Officer.

Your replies will be read aloud.

Therefore:

- Never use markdown.
- Never use headings.
- Never use ## or **.
- Keep sentences short.
- Use simple English.
- Be practical.
- Answer directly.
- Maximum 200 words.

========================
CURRENT FARM DATA
========================

Location:
${location}

State:
${state}

Weather:
Temperature: ${weather.temperature}°C
Humidity: ${weather.humidity}%
Rainfall: ${weather.rainfall} mm
Disease Risk: ${weather.diseaseRisk}

========================
AVAILABLE CROPS DATABASE
========================

Available crops:
${crops.map(c => c.name).join(", ")}

========================
MARKET DATA
========================

${JSON.stringify(market, null, 2)}

========================
GOVERNMENT SCHEMES
========================

Available schemes:
${schemes.map(s => `${s.name} - ${s.benefit}`).join("\n")}

========================
FARMER QUESTION
========================

${question}

====================================================
OUTPUT FORMAT (VERY IMPORTANT)
====================================================

1. NEVER use Markdown.

Do NOT use:
#
##
###
**
__
---
Tables

2. Never write "Introduction", "Conclusion", "Next Steps".

3. Speak naturally like an Agriculture Officer talking to a farmer.

4. Keep the answer between 120 and 220 words.

5. Start immediately with the answer.

Example:

"Considering today's weather in Parbhani, soybean is a very good option because..."

NOT

"Introduction"

6. Use short bullet points only.

Use:
• Soybean
• Cotton

Never use numbered lists unless the farmer specifically asks for ranking.

7. Mention the farmer's location naturally once.

Example:
"Considering today's weather in Parbhani..."

8. If recommending crops, provide only:

• Crop name
• Suitability (/10)
• One-line reason
• Market outlook

Maximum 5 crops.

9. If explaining cultivation, keep each section to one or two bullets.

10. Never repeat weather values already provided on screen unless necessary.

11. Never say:
"Based on the supplied database..."
"According to the crop database..."
"Available crop database..."

12. Never say:
"Market demand unknown."

Instead say:
"Current market price is unavailable."

13. End with ONE practical recommendation.

Example:
"I recommend sowing soybean within the next week if rainfall begins."

14. Keep the response easy to understand for farmers.

15. Avoid unnecessary greetings.
16. don't slack off about being senior agricultral officer
`;
    console.log("Prompt length:", prompt.length);

    const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            top_p: 0.9,
            messages: [
                {
                    role: "system",
                    content:
                        "You are KrishiDhan AI. Always answer using the supplied weather, crops, market and schemes. Never invent agricultural facts."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    });

    if (!response.ok) {
        const err = await response.text();
        console.error("Groq Response:", err);
        throw new Error(err);
    }

    const json = await response.json();

    return json.choices[0].message.content;
}