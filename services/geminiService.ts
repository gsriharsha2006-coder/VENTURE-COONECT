
import { GoogleGenAI, Type } from "@google/genai";

// Removed global client getter to comply with guidelines: instantiate right before making an API call.

export async function analyzePitch(pitchText: string) {
  // Always use process.env.API_KEY directly when initializing the GoogleGenAI client instance
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Upgrade to 'gemini-3-pro-preview' for complex reasoning tasks like startup pitch analysis
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the following startup pitch and provide structured feedback.
    
    Pitch: ${pitchText}
    
    Provide response in JSON format including:
    - score (0-100)
    - strengths (list of strings)
    - weaknesses (list of strings)
    - improvementTips (list of strings)`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvementTips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["score", "strengths", "weaknesses", "improvementTips"]
      }
    }
  });

  try {
    // Access the extracted string output using the .text property directly
    const resultText = response.text;
    if (!resultText) {
      throw new Error("AI returned an empty response");
    }
    return JSON.parse(resultText.trim());
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw e;
  }
}
