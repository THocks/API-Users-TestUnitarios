import { User, USER_ROLES } from "../../src/models/User";

describe("User", () => {
  test("Objeto User com as propriedades corretas", () => {
    const user = new User(
      "1",
      "thiago",
      "thiagotest@gmail.com",
      "password123",
      USER_ROLES.NORMAL,
      "2022-05-10"
    );

    expect(user.getId()).toBe("1");
    expect(user.getName()).toBe("thiago");
    expect(user.getEmail()).toBe("thiagotest@gmail.com");
    expect(user.getPassword()).toBe("password123");
    expect(user.getRole()).toBe(USER_ROLES.NORMAL);
    expect(user.getCreatedAt()).toBe("2022-05-10");
  });

  test("Atualizar as propriedades corretamente", () => {
    const user = new User(
      "1",
      "thiago",
      "thiagotest@gmail.com",
      "password123",
      USER_ROLES.NORMAL,
      "2022-05-10"
    );
    user.setId("2");
    user.setName("thiagotestAtualizar");
    user.setEmail("thiagotesteAtualizar@outlook.com");
    user.setPassword("testeatualizar123");
    user.setRole(USER_ROLES.ADMIN);
    user.setCreatedAt("2022-05-11");

    expect(user.getId()).toBe("2");
    expect(user.getName()).toBe("thiagotestAtualizar");
    expect(user.getEmail()).toBe("thiagotesteAtualizar@outlook.com");
    expect(user.getPassword()).toBe("testeatualizar123");
    expect(user.getRole()).toBe(USER_ROLES.ADMIN);
    expect(user.getCreatedAt()).toBe("2022-05-11");
  });

  test("Converte para DBMODEL", () => {
    const user = new User(
      "1",
      "thiago",
      "thiagotest@gmail.com",
      "password123",
      USER_ROLES.NORMAL,
      "2022-05-10"
    );

    const dbUser = user.toDBModel();

    expect(dbUser.id).toBe("1");
    expect(dbUser.name).toBe("thiago");
    expect(dbUser.email).toBe("thiagotest@gmail.com");
    expect(dbUser.password).toBe("password123");
    expect(dbUser.role).toBe(USER_ROLES.NORMAL);
    expect(dbUser.created_at).toBe("2022-05-10");
  });

  test("Converte para BussinessModel", () => {
    const user = new User(
      "1",
      "thiago",
      "thiagotest@gmail.com",
      "password123",
      USER_ROLES.NORMAL,
      "2022-05-10"
    );

    const businessUser = user.toBusinessModel();

    expect(businessUser.id).toBe("1");
    expect(businessUser.name).toBe("thiago");
    expect(businessUser.email).toBe("thiagotest@gmail.com");
    expect(businessUser.role).toBe(USER_ROLES.NORMAL);
    expect(businessUser.createdAt).toBe("2022-05-10");
  });
});
