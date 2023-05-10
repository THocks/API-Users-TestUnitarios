import { ZodError } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";
import { LoginSchema } from "../../src/dtos/user/login.dto";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar um token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fulano123",
    });

    const output = await userBusiness.login(input);

    expect(output).toEqual({
      message: "Login realizado com sucesso",
      token: "token-mock-fulano",
    });
  });

  test("Email não e valido", async () => {
    expect.assertions(1);
    try {
      const input = LoginSchema.parse({
        email: undefined,
        password: "fulano123",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues).toEqual([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["email"],
            message: "Required",
          },
        ]);
      }
    }
  });

  test("Email não encontrado", async () => {
    expect.assertions(1);
    try {
      const input = LoginSchema.parse({
        email: "loginteste@gmail.com",
        password: "7845120",
      });

      const output = await userBusiness.login(input);
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toBe("'email' não encontrado");
      }
    }
  });
});
