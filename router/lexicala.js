import express from "express";
import Controller from "../controller/lexicala.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new Controller();
  }

  start() {
    this.router.get("/meaning", this.controller.getMeaning);

    return this.router;
  }
}

export default Router;
