import UserDAO from "../model/DAO/rivalearnPSQL.js";
import { validate } from "./validation/users.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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

  async login(username, password) {
    try {
      const user = await this.model.findUser(username, password);
      let expiryDate;
      if (!user) {
        throw new Error("Usuario no encontrado o contraseña incorrecta");
      }
      const existingRefreshToken = await this.model.getValidRefreshToken(
        user.id
      );
      if (existingRefreshToken) {
        expiryDate = await this.model.getRefreshTokenExpiryDate(
          existingRefreshToken.token
        );
        return {
          access_token: this.generateUserToken(user, "1h"),
          refresh_token: existingRefreshToken.token,
          expiry_date: expiryDate,
          username: user.username,
          user_id: user.id,
        };
      } else {
        const tokens = this.generateTokens(user);
        await this.saveRefreshToken(user.id, tokens.refresh_token);
        expiryDate = await this.model.getRefreshTokenExpiryDate(
          tokens.refresh_token
        );
        return {
          ...tokens,
          expiry_date: expiryDate,
          username: user.username,
          user_id: user.id,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  generateTokens(user) {
    const accessToken = this.generateUserToken(user, "1h");
    const refreshToken = this.generateUserToken(user, "7d");
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  generateUserToken(user, expiry_date) {
    return jwt.sign(
      { id: user.id, username: user.username },
      this.generateSecretKey(),
      {
        expiresIn: expiry_date,
      }
    );
  }

  generateSecretKey() {
    return crypto.randomBytes(64).toString("hex");
  }

  async saveRefreshToken(userId, refreshToken) {
    try {
      await this.model.saveRefreshToken(userId, refreshToken);
    } catch (error) {
      throw error;
    }
  }

  async checkRefreshToken(userId) {
    try {
      const refreshToken = await this.model.getValidRefreshToken(userId);
      return refreshToken;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
