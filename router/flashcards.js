import express from "express";
import Controller from "../controller/flashcards.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/get/:deckname", this.controller.getFlashcards);
    this.router.post("/create", this.controller.saveFlashcard);

    return this.router;
  }
}

export default Router;
