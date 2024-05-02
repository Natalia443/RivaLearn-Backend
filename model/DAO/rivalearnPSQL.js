import pool from "../DBPostgreSQL.js";

class UserDAO {
  async saveUser(username, password, email) {
    try {
      const query =
        "INSERT INTO users (username, password, email) VALUES ($1, crypt($2, gen_salt('bf')), $3)";
      const values = [username, password, email];
      await pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }

  async findUser(username, password) {
    try {
      const query =
        "SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)";
      const user = await pool.query(query, [username, password]);
      const firstUser = user.rows[0];
      return firstUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserId(username) {
    try {
      const query = "SELECT id FROM users WHERE username = $1";
      const userId = await pool.query(query, [username]);
      return userId.rows[0].id;
    } catch (error) {
      throw error;
    }
  }

  async saveRefreshToken(userId, refreshToken) {
    try {
      const query = `
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES ($1, crypt($2, gen_salt('bf')), NOW() + INTERVAL '7 days')
      `;
      const values = [userId, refreshToken];
      await pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }

  async getValidRefreshToken(userId) {
    try {
      const query = `
        SELECT * FROM refresh_tokens
        WHERE user_id = $1 AND expires_at > NOW()
        ORDER BY expires_at DESC
        LIMIT 1
      `;
      const refreshToken = await pool.query(query, [userId]);
      return refreshToken.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getDecks(userId) {
    try {
      const query = "SELECT * FROM decks WHERE user_id = $1";
      const decksQuery = await pool.query(query, [userId]);
      const decks = decksQuery.rows.map((row) => row.name);
      return decks;
    } catch (error) {
      throw error;
    }
  }

  async saveDeck(userId, deckname) {
    try {
      const query = "INSERT INTO decks(user_id, name) VALUES($1, $2)";
      await pool.query(query, [userId, deckname]);
    } catch (error) {
      throw error;
    }
  }
}

export default UserDAO;
