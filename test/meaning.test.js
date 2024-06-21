import { expect } from "chai";
import supertest from "supertest";
import Server from "../server.js";

describe("GET", () => {
  it("debería traer la definición de diccionario de la palabra buscada", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const exampleWord = "house";
    const exampleLang = "en";

    console.log(`Palabra: ${exampleWord} \n Idioma: ${exampleLang}`);

    const response = await request.get(
      `/api/dict/meaning?text=${exampleWord}&language=${exampleLang}`
    );

    expect(response.body).to.not.be.null;
    expect(response.status).to.eql(200);
    console.log(response.body.results);

    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});
