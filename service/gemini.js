import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

class Gemini {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async createChat(prompt, history) {
    try {
      const chat = this.model.startChat({
        history: history,
      });
      const result = await chat.sendMessage(prompt);
      return result.response.text().replace(/(\n|\n\n|\*\*|\\"|"|##)/g, "");
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching Gemini API: ${error}.`);
    }
  }

  async createStory(words) {
    try {
      const wordsList = words.map((word) => word.vocab).join(", ");
      const prompt = `Estamos desarrollando una app que crea historias con palabras de vocabulario nuevas para estudiantes novatos de idiomas. Quiero que me escribas una historia que contenga estas palabras : ${wordsList} y la historia este escrita en el idioma de las palabras que te estoy enviando. Es decir, si las palabras están en inglés, la historia también. No le pongas un título.`;
      const result = await this.model.generateContent(prompt);
      let story = await result.response.text();
      story = story.replace(/(\n|\n\n|\*\*|\\"|"|##)/g, "");
      return story;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching Gemini API: ${error}.`);
    }
  }
}

export default Gemini;
