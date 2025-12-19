
import { GoogleGenAI, GenerateContentResponse, Modality, Type } from "@google/genai";
import { ChatMessage } from "../types";

// Using the most advanced model for high-reasoning and grounding
const MODEL_NAME = 'gemini-3-pro-preview';

export const getGeminiStreamResponse = async function* (
  prompt: string, 
  history: ChatMessage[] = [],
  systemInstruction: string = "You are Smart Aid Elite v8. You are the world's most capable AI assistant. Use Google Search for real-time news, weather, laws, and professional facts. Format your output with bold headers, emojis, and clear spacing. Be concise but extremely smart."
) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const responseStream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents: [
        ...history.map(msg => ({ 
          role: msg.role === 'user' ? 'user' : 'model', 
          parts: [{ text: msg.text }] 
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ] as any,
      config: {
        systemInstruction,
        temperature: 0.75,
        tools: [{ googleSearch: {} }] // Real-time grounding enabled
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) yield chunk.text;
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "⚠️ **System Sync Error:** The Intelligence Core is rebooting. Please try again in a moment! 💎";
  }
};

export interface ExpertProfile {
  name: string;
  title: string;
  bio: string;
  rating: number;
  location: string;
  specialty: string;
  experience: string;
  price: string;
  phoneNumber: string;
}

export const generateExperts = async (category: string, country: string): Promise<ExpertProfile[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate 6 elite expert profiles for "${category}" located in "${country}". 
      Requirements:
      - Realistic names for the region.
      - Titles like 'Senior Lead', 'Chief', or 'Principal'.
      - High experience (10+ years).
      - Realistic international phone format for ${country}.
      - Local currency pricing.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              title: { type: Type.STRING },
              bio: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              location: { type: Type.STRING },
              specialty: { type: Type.STRING },
              experience: { type: Type.STRING },
              price: { type: Type.STRING },
              phoneNumber: { type: Type.STRING }
            },
            required: ["name", "title", "bio", "rating", "location", "specialty", "experience", "price", "phoneNumber"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [];
  }
};

export interface GameChallenge {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const generateGameChallenge = async (type: string): Promise<GameChallenge> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate a high-IQ ${type} puzzle. Include 4 difficult options.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { question: "Network error. Try again!", options: [], correctAnswer: "", explanation: "" };
  }
};
