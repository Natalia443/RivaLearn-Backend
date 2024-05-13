import Service from "../service/quiz.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  saveStats = async (req, res) => {
    try {
      const { deckname, username, flashcard, success, fail } = req.body;
      await this.service.saveStats(
        deckname,
        username,
        flashcard,
        success,
        fail
      );
    } catch (error) {
      console.error("Error saving stats:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getStats = async (req, res) => {
    try {
      const { username } = req.params;
      const stats = await this.service.getStats(username);
      res.json(stats);
    } catch (error) {
      console.error("Error getting stats:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default Controller;
