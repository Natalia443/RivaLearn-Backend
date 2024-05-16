import express from "express";
import Controller from "../controller/lexicala.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/meaning", this.controller.getMeaning);
    /**
     * @swagger
     * /api/dict/meaning:
     *  get:
     *    summary: Obtener significado de un texto en un idioma específico
     *    tags:
     *      - Meaning
     *    parameters:
     *      - in: query
     *        name: text
     *        schema:
     *          type: string
     *        required: true
     *        description: Texto del cual se quiere obtener el significado
     *      - in: query
     *        name: language
     *        schema:
     *          type: string
     *        required: true
     *        description: Idioma en el cual se quiere obtener el significado del texto
     *    responses: 
     *      200:
     *        description: Significado obtenido con éxito
     *      500:
     *        description: Error de servidor
     */
    
    return this.router;
  }
}

export default Router;
