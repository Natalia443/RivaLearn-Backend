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
      return user;
    } catch (error) {
      throw error;
    }
  }

  async saveRefreshToken(userId, refreshToken) {
    try {
      const query = `
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES ($1, crypt($2, gen_salt('bf)), NOW() + INTERVAL '7 days')
      `;
      const values = [userId, refreshToken];
      await pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }
}

export default UserDAO;
