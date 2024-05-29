import express from "express";
import Controller from "../controller/quiz.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.post("/stats", this.controller.saveStats);
    /**
     * @swagger
     * /api/quiz/stats:
     *  post:
     *    summary: Guardar estadisticas Quiz
     *    tags:
     *      - Quiz
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/QuizSchema'
     *    responses:
     *      200:
     *        description: Resultados de la Quiz registrado con exito
     *      400:
     *        description: Error en la carga de los resultados
     *      500:
     *        description: Error de servidor
     */
    this.router.get("/get/:userId", this.controller.getStats);
    /**
     * @swagger
     * /api/quiz/get/{userId}:
     *  get:
     *    summary: obtener Quiz mediante el Id
     *    tags:
     *      - Quiz
     *    parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *          type: integer
     *        required: true
     *        description: Id del usuario
     *    responses: 
     *      200:
     *        description: Informacion de estadisticas obtenidos con éxito
     *      400:
     *        description: Id de usuario invalido
     *      500:
     *        description: error de servidor
     */
    return this.router;
  }
}

export default Router;
