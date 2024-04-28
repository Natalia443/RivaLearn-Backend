import express from "express";
import Controller from "../controller/users.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.post("/user", this.controller.saveUser);
    this.router.post("/login", this.controller.login);

    return this.router;
  }
}

export default Router;
