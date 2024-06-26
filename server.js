import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import RouterText from "./router/gutendex.js";
import RouterDictionary from "./router/lexicala.js";
import RouterUsers from "./router/users.js";
import RouterDecks from "./router/decks.js";
import RouterFlashcards from "./router/flashcards.js";
import RouterQuiz from "./router/quiz.js";
import RouterGemini from "./router/gemini.js";

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.server = null;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.use("/api/lib", new RouterText().start());
    this.app.use("/api/dict", new RouterDictionary().start());
    this.app.use("/api/users", new RouterUsers().start());
    this.app.use("/api/decks", new RouterDecks().start());
    this.app.use("/api/flashcards", new RouterFlashcards().start());
    this.app.use("/api/quiz", new RouterQuiz().start());
    this.app.use("/api/gemini", new RouterGemini().start());

    // SWAGGER
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    const PORT = this.port;

    this.server = this.app.listen(PORT, () =>
      console.log(`Servidor express escuchando en http://localhost:${PORT}`)
    );
    this.server.on("error", (error) =>
      console.log(`Error en servidor: ${error.message}`)
    );

    return this.app;
  }

  async stop() {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }
}

export default Server;
