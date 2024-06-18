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
     * /api/decks/get/{userId}:
     *  get:
     *    summary: obtener deck mediante el Id
     *    tags:
     *      - Deck
     *    parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *          type: integer
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
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/DeckSchema'
     *    responses: 
     *      200:
     *        description: creacion de Deck con éxito
     *      400:
     *        description: error en la carga de datos
     *      500:
     *        description: error de servidor
     */
    this.router.delete("/delete/:deckId", this.controller.deleteDeck);
    /**
     * @swagger
     * /api/decks/delete/{deckId}:
     *  delete:
     *    summary: Eliminar Deck por Id
     *    tags:
     *      - Deck
     *    parameters:
     *      - in: path
     *        name: deckId
     *        schema:
     *          type: integer
     *        required: true
     *        description: Id del deck
     *    responses: 
     *      200:
     *        description: Deck eliminado con exito
     *      400:
     *        description: Error al eliminar el deck
     *      500:
     *        description: error de servidor
     */

    return this.router;
  }
}

export default Router;
