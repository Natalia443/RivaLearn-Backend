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

  async createStory(words) {
    try {
      console.log(words);
      const prompt = `Escribime una historia que contenga estas palabras y este escrita en el idioma de las mismas: ${words}`;
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching Gemini API: ${error}.`);
    }
  }
}

export default Gemini;
