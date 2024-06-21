import { expect } from "chai";
import supertest from "supertest";
import Server from "../server.js";

describe("GET", () => {
  it("debería devolver las estadísticas de un usuario", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const response = await request.get("/api/quiz/get/3");
    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.have.property("success");
    expect(response.body[0]).to.have.property("total");
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("GET", () => {
  it("debería devolver un array vacío si el ID del usuario proporcionado no existe", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const response = await request.get("/api/quiz/get/999");
    expect(response.body).to.be.an("array");
    expect(response.body.length).to.not.be.greaterThan(0);
    console.log(response.body);

    await server.stop();
  });
});

describe("POST", () => {
  it("debería guardar las estadísticas del usuario en la base de datos", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const stats = {
      userId: 13,
      success: 5,
      total: 10,
    };

    console.log(stats);

    const response = await request.post("/api/quiz/stats").send(stats);
    expect(response.body.message).to.equal("OK");
    console.log(response.body);
    expect(response.status).to.eql(200);

    await server.stop();
  });
});
