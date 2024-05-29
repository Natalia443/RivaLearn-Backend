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
      const decks = decksQuery.rows.map((row) => ({
        name: row.name,
        deck_id: row.id,
      }));
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

  async getFlashcards(deckId) {
    try {
      const query = "SELECT * FROM flashcards WHERE deck_id = $1";
      const flashcardsQuery = await pool.query(query, [deckId]);
      const flashcards = flashcardsQuery.rows.map((row) => ({
        id: row.id,
        vocab: row.vocab,
        vocab_translated: row.vocab_translated,
        vocab_example: row.vocab_example,
        vocab_example_translated: row.vocab_example_translated,
      }));
      return flashcards;
    } catch (error) {
      throw error;
    }
  }

  async saveFlashcard(
    deckId,
    vocab,
    translatedVocab,
    sourceLangSentence,
    targetLangSentence
  ) {
    try {
      const query =
        "INSERT INTO flashcards(deck_id, vocab, vocab_translated, vocab_example, vocab_example_translated) VALUES($1, $2, $3, $4, $5)";
      await pool.query(query, [
        deckId,
        vocab,
        translatedVocab,
        sourceLangSentence,
        targetLangSentence,
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getFlashcardName(flashcardId) {
    try {
      const query = "SELECT vocab FROM flashcards WHERE id = $1";
      const flashcard = await pool.query(query, [flashcardId]);
      return flashcard.rows[0].vocab;
    } catch (error) {
      throw error;
    }
  }

  async saveStats(userId, success, total) {
    try {
      const query =
        "INSERT INTO quiz_stats(user_id, successful_attempts, total_attempts) VALUES($1, $2, $3)";
      await pool.query(query, [userId, success, total]);
    } catch (error) {c
      throw error;
    }
  }

  async changeStats(userId, success, total) {
    try {
      const query =
        "UPDATE quiz_stats SET successful_attempts = successful_attempts + $2, total_attempts = total_attempts + $3 WHERE user_id = $1";
      await pool.query(query, [userId, success, total]);
    } catch (error) {
      throw error;
    }
  }

  async getStats(userId) {
    try {
      const query = "SELECT * FROM quiz_stats WHERE user_id = $1";
      const statsQuery = await pool.query(query, [userId]);
      const stats =
        statsQuery.rows.map((row) => ({   
          success: row.successful_attempts,
          total: row.total_attempts
        }));
      return stats;
    } catch (error) {
      throw error;
    }
  }

  async getFlashcardStats(userId) {
    try {
      const query = "SELECT * FROM quiz_stats WHERE user_id = $1";
      const statsQuery = await pool.query(query, [userId]);
      const stats = statsQuery.rows.map((row) => ({
        success: row.successful_attempts,
        total: row.total_attempts,
      }));
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

export default UserDAO;
