const Key = require('../config/config').ai.aiKey
const Preprompt = require('../config/config').ai.prompt

module.exports = {
    enhance : async (content,prompt) => {
        const finalPrompt = Preprompt+" "+prompt+"here is the content ["+content+"]"
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" ,
            "X-goog-api-key" : Key
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: finalPrompt }] }]
        })
    });
    const data = await response.json()
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || content;
    return aiText
    }
}