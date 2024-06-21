import { expect } from "chai";
import supertest from "supertest";
import Server from "../server.js";

describe("GET", () => {
  it("debería traer los decks del usuario", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const userId = 3;

    const response = await request.get(`/api/decks/get/${userId}`);
    expect(response.body).to.not.be.undefined;
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("POST", () => {
  it("debería crear un deck", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const deck = {
      userId: 13,
      deckname: "deck frances",
    };

    const response = await request.post("/api/decks/create").send(deck);
    expect(response.body.message).to.equal("OK");
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("DELETE", () => {
  it("debería eliminar un deck", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const deckId = 63;

    const response = await request.delete(`/api/decks/delete/${deckId}`);
    expect(response.body.message).to.equal("OK");
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});
