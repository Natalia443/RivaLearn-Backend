import express from "express";
import Controller from "../controller/decks.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/get/:username", this.controller.getDecks);
    this.router.post("/create", this.controller.saveDeck);

    return this.router;
  }
}

export default Router;
