import DeckDAO from "../model/DAO/rivalearnPSQL.js";

class Service {
  constructor() {
    this.model = new DeckDAO();
  }

  async getDecks(userId) {
    try {
      const decks = await this.model.getDecks(userId);
      return decks;
    } catch (error) {
      throw error;
    }
  }

  async saveDeck(userId, deckname) {
    try {
      await this.model.saveDeck(userId, deckname);
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
