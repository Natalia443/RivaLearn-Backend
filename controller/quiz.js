import Service from "../service/quiz.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  saveStats = async (req, res) => {
    try {
      const { userId, flashcardId, success, fail } = req.body;
      await this.service.saveStats(userId, flashcardId, success, fail);
      res.status(200).json({ message: "OK" });
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
