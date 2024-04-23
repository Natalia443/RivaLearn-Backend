import Service from "../service/lexicala.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  getMeaning = async (req, res) => {
    try {
      const { text } = req.query;
      const data = await this.service.getMeaning(text);
      res.json(data);
    } catch (error) {
      console.error("Error fetching meaning:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default Controller;
