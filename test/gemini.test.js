import { expect } from "chai";
import supertest from "supertest";
import Server from "../server.js";

describe("POST", () => {
  it("La IA debería crear una historia con las palabras enviadas", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const words = {
      words: [{ vocab: "dog" }, { vocab: "house" }, { vocab: "summer" }],
    };
    console.log(words);

    const response = await request.post("/api/gemini/story").send(words);
    expect(response.body).to.not.be.undefined;
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("POST", () => {
  it("La IA debería responder al mensaje del usuario", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const prompt = "que significa?";
    const history = [
      {
        role: "user",
        parts: [
          {
            text: "lawyer",
          },
        ],
      },
    ];

    const response = await request
      .post("/api/gemini/chat")
      .send({ prompt, history });
    expect(response.body).to.not.be.undefined;
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});
