import DAO from "../model/DAO/rivalearnPSQL.js";

class Service {
  constructor() {
    this.model = new DAO();
  }

  async saveStats(deckId, userId, flashcard, success, fail) {
    try {
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

  async getStats(userId) {
    try {
      const stats = await this.model.getStats(userId);
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
