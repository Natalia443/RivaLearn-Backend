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
     *    summary: Obtener flashcard mediante el nombre de un deck
     *    tags:
     *      - Flashcard
     *    parameters:
     *      - in: path
     *        name: deckname
     *        required: true
     *        description: Nombre del deck
     *    responses: 
     *      200:
     *        description: Flashcards obtenidas con éxito
     *      500:
     *        description: Error de servidor
     */
    this.router.post("/create", this.controller.saveFlashcard);
    /**
    * @swagger
    * /api/flashcards/create:
    *  post:
    *    summary: Crear flashcards
    *    tags:
    *      - Flashcard
    *    requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            $ref: '#/components/schemas/FlashcardSchema'
    *    responses: 
    *      200:
    *        description: Usuario registrado con exito
    *      400:
    *        description: Error en la carga del usuario
    *      500:
    *        description: Error de servidor
    */

    return this.router;
  }
}

export default Router;
