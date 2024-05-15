import express from "express";
import Controller from "../controller/flashcards.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/get/:deckname", this.controller.getFlashcards);
    /**
     * @swagger
     * /api/flashcards/get/{deckname}:
     *  get:
     *    summary: obtener deck mediante el Id
     *    tags:
     *      - Deck
     *    parameters:
     *      - in: path
     *        name: deckname
     *        required: true
     *        description: Id del usuario
     *    responses: 
     *      200:
     *        description: Listado de decks obtenidos con éxito
     *      400:
     *        description: Id de usuario invalido
     *      500:
     *        description: error de servidor
     */
    this.router.post("/create", this.controller.saveFlashcard);

    return this.router;
  }
}

export default Router;
