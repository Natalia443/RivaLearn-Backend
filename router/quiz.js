import express from "express";
import Controller from "../controller/quiz.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.post("/stats", this.controller.saveStats);
    this.router.get("/get/:userId", this.controller.getStats);
    return this.router;
  }
}

export default Router;
