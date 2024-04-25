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
}

export default Controller;