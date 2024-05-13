import DAO from "../model/DAO/rivalearnPSQL.js";

class Service {
  constructor() {
    this.model = new DAO();
  }

  async saveStats(deckname, username, flashcard, success, fail) {
    try {
      const userId = await this.model.getUserId(username);
      const deckId = await this.model.getDeckId(deckname);
      const flashcardId = await this.model.getFlashcardId(deckId, flashcard);
      const existingStat = await this.model.getFlashcardStats(
        userId,
        flashcardId
      );
      if (existingStat && existingStat.length > 0) {
        await this.model.changeStats(userId, flashcardId, success, fail);
      } else {
        await this.model.saveStats(userId, flashcardId, success, fail);
      }
    } catch (error) {
      throw error;
    }
  }

  async getStats(username) {
    try {
      const userId = await this.model.getUserId(username);
      const stats = await this.model.getStats(userId);
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
