import express from "express";
import Controller from "../controller/decks.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/get/:userId", this.controller.getDecks);
    /**
     * @swagger
     * /api/decks/get/{username}:
     *  get:
     *    summary: obtener deck mediante el Id
     *    tags:
     *      - Deck
     *    parameters:
     *      - in: path
     *        name: username
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
    this.router.post("/create", this.controller.saveDeck);
    /**
     * @swagger
     * /api/decks/create:
     *  post:
     *    summary: crear deck
     *    tags:
     *      - Deck
     *    responses: 
     *      200:
     *        description: creacion de Deck con éxito
     *      500:
     *        description: error de servidor
     */

    return this.router;
  }
}

export default Router;
