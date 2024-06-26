import express from "express";
import Controller from "../controller/flashcards.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/get/:deckId", this.controller.getFlashcards);
    /**
     * @swagger
     * /api/flashcards/get/{deckId}:
     *  get:
     *    summary: Obtener flashcards de un deck mediante su id
     *    tags:
     *      - Flashcard
     *    parameters:
     *      - in: path
     *        name: deckId
     *        required: true
     *        description: ID del deck
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
     *        description: Flashcard creada con éxito
     *      400:
     *        description: Error en la creación de la flashcard
     *      500:
     *        description: Error de servidor
     */

    this.router.get("/detail/:flashcardId", this.controller.getFlashcardById);
    /**
     * @swagger
     * /api/flashcards/detail/{id}:
     *  get:
     *    summary: Obtener los detalles de una flashcard mediante su id
     *    tags:
     *      - Flashcard
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        description: ID de la flashcard
     *    responses:
     *      200:
     *        description: Detalles de la flashcard obtenidos con éxito
     *      500:
     *        description: Error de servidor
     */

    this.router.delete("/delete/:flashcardId", this.controller.deleteFlashcard);
    /**
     * @swagger
     * /api/flashcards/delete/{flashcardId}:
     *  delete:
     *    summary: Eliminar flashcard por Id
     *    tags:
     *      - Flashcard
     *    parameters:
     *      - in: path
     *        name: flashcardId
     *        required: true
     *        description: ID de la flashcard
     *    responses:
     *      200:
     *        description: Flashcard eliminada con éxito
     *      400:
     *        description: Error al eliminar Flashcard
     *      500:
     *        description: Error de servidor
     */

    this.router.put("/update", this.controller.updateFlashcard);
    /**
     * @swagger
     * /api/flashcards/update:
     *  put:
     *    summary: Editar flashcards
     *    tags:
     *      - Flashcard
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              flashcardId:
     *                type: integer
     *                description: ID de la flashcard
     *              vocab:
     *                type: string
     *                description: Palabra
     *              vocabExample:
     *                type: string
     *                description: Frase de ejemplo
     *              sourceLang:
     *                type: string
     *                description: Idioma de origen
     *              targetLang:
     *                type: string
     *                description: Idioma de destino
     *    responses:
     *      200:
     *        description: Flashcard editada con éxito
     *      400:
     *        description: Error en la edicion de la flashcard
     *      500:
     *        description: Error de servidor
     */
    return this.router;
  }
}

export default Router;
