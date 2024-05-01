import express from "express";
import Controller from "../controller/decks.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/decks/:username", this.controller.getDecks);
    this.router.post("/decks", this.controller.saveDeck);

    return this.router;
  }
}

export default Router;
