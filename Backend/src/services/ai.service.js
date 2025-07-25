const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_KEY,
});

//  Reusable function that takes a prompt and returns the AI's response
//  Refactor AI response according to your application using systemInstruction property
async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    systemInstruction: `You are a strict code reviewer with full stack expertise. Review only the given code. Do not ask questions. Identify bugs, inefficiencies, and suggest improvements. Return corrected code if needed. Follow best practices. Be concise, direct, and focused only on code. No extra conversation.
`
  });

  
  return response.candidates[0].content.parts[0].text;
;
}

module.exports = generateContent;
