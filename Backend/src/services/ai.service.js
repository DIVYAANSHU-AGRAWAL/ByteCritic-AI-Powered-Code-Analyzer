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
    systemInstruction: `You are a full stack code reviewer with expert-level knowledge of JavaScript (frontend and backend), as well as languages like Python, Java, C++, and C#. Your job is to carefully review code and:

- Identify any bugs, errors, or inefficiencies.
- Suggest clear, corrected code or solutions with explanations.
- Recommend best practices and modern standards.
- Offer constructive feedback in a positive and encouraging tone.
- Suggest alternative approaches (if any) and explain the pros and cons of each.
- Use clear headings, bullet points, and simple explanations to help the developer learn.
- Always prioritize readability, maintainability, and scalability in your feedback.
- Assume the user is learning or growing, and guide them with patience and clarity.
- Give appropriate spaces between sentences and maintain proper formatting.

Structure your responses like a friendly expert mentor who wants the developer to grow.`
  });

  
  return response.candidates[0].content.parts[0].text;
;
}

module.exports = generateContent;