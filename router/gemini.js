import express from "express";
import Controller from "../controller/gemini.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.post("/chat", this.controller.createChat);
    /**
     * @swagger
     * /api/gemini/chat:
     *  post:
     *    summary: hablar con el chatBot
     *    tags:
     *      - Gemini
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/ChatSchema'
     *    responses: 
     *      200:
     *        description: respuesta del chatBot correcta
     *      500:
     *        description: error de servidor
     */
    this.router.post("/story", this.controller.createStory);
    /**
     * @swagger
     * /api/gemini/story:
     *  post:
     *    summary: crear historia con IA
     *    tags:
     *      - Gemini
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/StorySchema'
     *    responses: 
     *      200:
     *        description: respuesta de la API correcta
     *      500:
     *        description: error de servidor
     */

    return this.router;
  }
}

export default Router;
