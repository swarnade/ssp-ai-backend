const { GoogleGenAI } = require("@google/genai");
const apiKey = process.env.Google_Gemini_Key 
async function gemini(input, model) {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    try {
        const response = await ai.models.generateContent({
            model,
            contents: input,
        });
        return response.text;

    } catch (err) {

        return { error: "Failed to generate content." };
    }
}

module.exports = gemini;