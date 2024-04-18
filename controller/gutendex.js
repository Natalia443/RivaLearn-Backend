import Service from "../service/gutendex.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  getBooks = async (req, res) => {
    try {
      const code = req.query.code;
      const data = await this.service.getBooks(code);
      res.json(data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getText = async (req, res) => {
    try {
      const url = req.query.url;
      const text = await this.service.getText(url);
      res.send(text);
    } catch (error) {
      console.error("Error fetching text:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default Controller;
