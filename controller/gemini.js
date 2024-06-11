import Service from "../service/gemini.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  createChat = async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await this.service.createChat(prompt);
      res.json(response);
    } catch (error) {
      console.error("Error fetching Gemini API:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  createStory = async (req, res) => {
    try {
      const { words } = req.body;
      const response = await this.service.createStory(words);
      res.json(response);
    } catch (error) {
      console.error("Error fetching Gemini API:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
}

export default Controller;
