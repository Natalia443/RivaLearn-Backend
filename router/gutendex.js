import express from "express";
import Controller from "../controller/gutendex.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/books", this.controller.getBooks);
    this.router.get("/text", this.controller.getText);

    return this.router;
  }
}

export default Router;
