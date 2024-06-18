import Service from "../service/decks.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  getDecks = async (req, res) => {
    try {
      const { userId } = req.params;
      const decks = await this.service.getDecks(userId);
      res.json(decks);
    } catch (error) {
      console.error("Error fetching decks:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

  saveDeck = async (req, res) => {
    try {
      const { userId, deckname } = req.body;
      await this.service.saveDeck(userId, deckname);
      res.status(200).json({  "message": "OK"});
    } catch (error) {
      console.error("Error saving deck:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

  deleteDeck = async (req, res) => {
    try {
      const { deckId } = req.params;
      await this.service.deleteDeck(deckId);
      res.status(200).json({  "message": "OK"});
    } catch (error) {
      console.error("Error deleting deck:", error.message);
      res.status(400).json({ error: error.message });
    }
  };
}

export default Controller;
