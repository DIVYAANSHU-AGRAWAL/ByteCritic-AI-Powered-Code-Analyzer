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
    systemInstruction: `You are a code reviewer, who has an expertise in web development, You have to look for any errors in code and reflect them. Then you will suggest the correct solutions. Also suggest the best practices. Provide Constructive Feedback. Reflect multiple approaches too.`
  });

  
  return response.candidates[0].content.parts[0].text;
;
}

module.exports = generateContent;