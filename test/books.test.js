import { expect } from "chai";
import supertest from "supertest";
import Server from "../server.js";

describe("GET", () => {
  it("debería traer los libros en el idioma elegido", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const lang = "es";

    const response = await request.get(`/api/lib/books?code=${lang}`);
    expect(response.body).to.not.be.null;
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("GET", () => {
  it("debería traer el texto del libro seleccionado", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const url = "https://www.gutenberg.org/cache/epub/7256/pg7256.txt";

    const response = await request.get(`/api/lib/text?url=${url}`);
    expect(response.body).to.not.be.null;
    expect(response.status).to.eql(200);
    console.log(response);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});
