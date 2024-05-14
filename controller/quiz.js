import Service from "../service/quiz.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  saveStats = async (req, res) => {
    try {
      const { deckname, userId, flashcard, success, fail } = req.body;
      await this.service.saveStats(deckname, userId, flashcard, success, fail);
    } catch (error) {
      console.error("Error saving stats:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getStats = async (req, res) => {
    try {
      const { userId } = req.params;
      const stats = await this.service.getStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error getting stats:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default Controller;
