import { faker } from "@faker-js/faker";

const user = {
  username: faker.internet.userName().replace(/[^a-zA-Z0-9]/g, ""),
  password: faker.internet.password(),
  email: faker.internet.email(),
};

export default {
  user,
};
