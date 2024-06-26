import Service from "../service/users.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  saveUser = async (req, res) => {
    try {
      const { username, password, email } = req.body;
      await this.service.saveUser(username, password, email);
      res.status(200).json({  "message": "OK"});
    } catch (error) {
      console.error("Error saving user:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const userData = await this.service.login(username, password);
      res.json(userData);
    } catch (error) {
      console.error("Error signing in:", error.message);
      res.status(400).json({ error: error.message });
    }
  };
}

export default Controller;
