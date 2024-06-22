import { expect } from "chai";
import supertest from "supertest";
import Server from "../server.js";

describe("GET", () => {
  it("debería obtener las flashcards de un deck determinado", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const deckId = 5;

    const response = await request.get(`/api/flashcards/get/${deckId}`);
    expect(response.body).to.not.be.undefined;
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("GET", () => {
  it("debería obtener los detalles de una flashcard determinada", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const flashcardId = 3;

    const response = await request.get(`/api/flashcards/detail/${flashcardId}`);
    expect(response.body).to.not.be.undefined;
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("POST", () => {
  it("debería crear una flashcard", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const flashcard = {
      deckId: 5,
      vocab: "star",
      sourceLang: "en",
      targetLang: "es",
    };

    const response = await request
      .post("/api/flashcards/create")
      .send(flashcard);
    expect(response.body.message).to.equal("OK");
    console.log(response.body);
    expect(response.status).to.eql(200);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("DELETE", () => {
  it("debería eliminar una flashcard", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const flashcardId = 90;

    const response = await request.delete(
      `/api/flashcards/delete/${flashcardId}`
    );
    expect(response.body.message).to.equal("OK");
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("PUT", () => {
  it("debería editar un flashcard", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const update = {
      flashcardId: 69,
      vocab: "girl",
      vocabExample:
        "The girl smiled brightly as she received her birthday present.",
      sourceLang: "en",
      targetLang: "es",
    };

    const response = await request.put("/api/flashcards/update").send(update);
    expect(response.body.message).to.equal("OK");
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});
