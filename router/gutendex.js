import express from "express";
import Controller from "../controller/gutendex.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/books", this.controller.getBooks);
    /**
     * @swagger
     * /api/lib/books:
     *  get:
     *    summary: Obtener books mediante su codigo
     *    tags:
     *      - Books
     *    parameters:
     *      - in: query
     *        name: code
     *        schema:
     *          type: string
     *        required: true
     *        description: Código del idioma en el que se quiere buscar libros
     *    responses: 
     *      200:
     *        description: Books obtenidos con éxito
     *      400:
     *        description: Error en la carga del código
     *      500:
     *        description: Error de servidor
     */

    this.router.get("/text", this.controller.getText);
    /**
     * @swagger
     * /api/lib/text:
     *  get:
     *    summary: Obtener el texto de un libro
     *    tags:
     *      - Books
     *    parameters:
     *      - in: query
     *        name: url
     *        schema:
     *          type: string
     *        required: true
     *        description: Ingrese la url del texto que quiere obtener
     *    responses: 
     *      200:
     *        description: Text obtenidos con éxito
     *      400:
     *        description: Error text
     *      500:
     *        description: Error de servidor
     */

    return this.router;
  }
}

export default Router;
