import express from "express";
import Controller from "../controller/users.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.post("/signup", this.controller.saveUser);
    /** 
    * @swagger
    * /api/users/signup:
    *  post:
    *    summary: registrar usuario
    *    tags:
    *      - User
    *    requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            $ref: '#/components/schemas/UserSchemaReg'
    *    responses: 
    *      200:
    *        description: usuario registrado con exito
    *      400:
    *        description: error en la carga del usuario
    *      500:
    *        description: error de servidor
    */


    this.router.post("/login", this.controller.login);
    /**
     * @swagger
     * /api/users/login:
     *  post:
     *    summary: Acceso del usuario
     *    tags:
     *      - User
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/UserSchemaLog'
     *    responses: 
     *      200:
     *        description: El usuario ingresó con exito
     *      400:
     *        description: Error en la carga del usuario
     *      500:
     *        description: Error de servidor
     */

    return this.router;
  }
}

export default Router;
