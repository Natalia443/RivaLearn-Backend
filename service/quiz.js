import DAO from "../model/DAO/rivalearnPSQL.js";

class Service {
  constructor() {
    this.model = new DAO();
  }

  async saveStats(userId, success, total) {
    try {
      const existingStat = await this.model.getFlashcardStats(userId);
      if (!existingStat) {
        await this.model.saveStats(userId, success, total);
      } else {
        await this.model.changeStats(userId, success, total);
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
