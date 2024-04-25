import UserDAO from "../model/DAO/rivalearnPSQL.js";
import { validate } from "./validation/users.js";

class UserService {
  constructor() {
    this.model = new UserDAO();
  }

  async saveUser(username, password, email) {
    try {
      const user = { username, password, email };
      const validationResult = validate(user);
      if (validationResult.error) {
        throw new Error(validationResult.error.details[0].message);
      }

      await this.model.saveUser(username, password, email);
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
