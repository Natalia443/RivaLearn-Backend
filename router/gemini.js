import express from "express";
import Controller from "../controller/gemini.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.post("/chat", this.controller.createChat);
    this.router.post("/story", this.controller.createStory);

    return this.router;
  }
}

export default Router;
