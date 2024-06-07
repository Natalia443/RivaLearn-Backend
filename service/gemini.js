import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

class Gemini {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async createChat(prompt) {
    try {
      const chat = this.model.startChat({
        generationConfig: {
          maxOutputTokens: 100,
        },
      });
      const result = await chat.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching Gemini API: ${error}.`);
    }
  }

  async createStory(lang, words) {
    try {
      const wordsList = words.join(", ");
      const prompt = `Escribime una historia en ${lang} que contenga las palabras: ${wordsList}`;
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching Gemini API: ${error}.`);
    }
  }
}

export default Gemini;
