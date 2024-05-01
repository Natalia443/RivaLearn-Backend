import DeckDAO from "../model/DAO/rivalearnPSQL.js";

class Service {
  constructor() {
    this.model = new DeckDAO();
  }

  async getDecks(username) {
    try {
      const userId = await this.model.getUserId(username);
      const decks = await this.model.getDecks(userId);
      return decks;
    } catch (error) {
      throw error;
    }
  }

  async saveDeck(username, deckname) {
    try {
      const userId = await this.model.getUserId(username);
      await this.model.saveDeck(userId, deckname);
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
