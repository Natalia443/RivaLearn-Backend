import Service from "../service/users.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  saveUser = async (req, res) => {
    try {
      const { username, password, email } = req.body;
      await this.service.saveUser(username, password, email);
    } catch (error) {
      console.error("Error saving user:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const tokens = await this.service.login(username, password);
      res.json(tokens);
    } catch (error) {
      console.error("Error signing in:", error.message);
      res.status(400).json({ error: error.message });
    }
  };
}

export default Controller;
