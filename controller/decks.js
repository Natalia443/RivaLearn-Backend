import Service from "../service/decks.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  getDecks = async (req, res) => {
    try {
      const { username } = req.params;
      const decks = await this.service.getDecks(username);
      res.json(decks);
    } catch (error) {
      console.error("Error fetching decks:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

  saveDeck = async (req, res) => {
    try {
      const { username, deckname } = req.body;
      await this.service.saveDeck(username, deckname);
    } catch (error) {
      console.error("Error fetching decks:", error.message);
      res.status(400).json({ error: error.message });
    }
  };
}

export default Controller;
