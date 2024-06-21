import { expect } from "chai";
import supertest from "supertest";
import generator from "./generator/user.js";
import Server from "../server.js";

describe("POST", () => {
  it("debería iniciar sesión, devolviendo los tokens correspondientes", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const existingUser = {
      username: "theUser",
      password: "abc12345",
    };

    console.log(existingUser);

    const response = await request.post("/api/users/login").send(existingUser);
    expect(response.body).to.have.property("access_token");
    expect(response.body).to.have.property("refresh_token");
    expect(response.status).to.eql(200);
    console.log(response.body);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("POST", () => {
  it("no debería iniciar sesión con un usuario inexistente", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const user = generator.user;
    console.log(user);

    const response = await request.post("/api/users/login").send(user);
    console.log(response.body);
    expect(response.body).to.have.property("error");
    expect(response.status).to.eql(400);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("POST", () => {
  it("debería crear una cuenta", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const user = generator.user;
    console.log(user);

    const response = await request.post("/api/users/signup").send(user);
    expect(response.body).to.not.be.undefined;
    expect(response.status).to.eql(200);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("POST", () => {
  it("no debería crear una cuenta que no cumpla con las validaciones de Joi (usuario no alfanumerico)", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const invalidUser = {
      username: "/^example.unit.testing.^/",
      password: "12345678",
      email: "error@error.com",
    };

    console.log(invalidUser);

    const response = await request.post("/api/users/signup").send(invalidUser);
    console.log(response.body);
    expect(response.body).to.have.property("error");
    expect(response.status).to.eql(400);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("POST", () => {
  it("no debería crear una cuenta que no cumpla con las validaciones de Joi (contraseña menor a 8 caracteres)", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const invalidUser = {
      username: "invalidUser",
      password: "123",
      email: "error@error.com",
    };

    console.log(invalidUser);

    const response = await request.post("/api/users/signup").send(invalidUser);
    console.log(response.body);
    expect(response.body).to.have.property("error");
    expect(response.status).to.eql(400);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});

describe("POST", () => {
  it("no debería crear una cuenta que no cumpla con las validaciones de Joi (formato de email invalido)", async () => {
    const server = new Server(8081);
    const app = await server.start();
    const request = supertest(app);

    const invalidUser = {
      username: "invalidUser",
      password: "12345678",
      email: "error",
    };

    console.log(invalidUser);

    const response = await request.post("/api/users/signup").send(invalidUser);
    console.log(response.body);
    expect(response.body).to.have.property("error");
    expect(response.status).to.eql(400);
    console.log(`Status: ${response.status}`);

    await server.stop();
  });
});
