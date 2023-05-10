import { ZodError } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";
import { DeleteUserSchema } from "../../src/dtos/user/delUser.dto";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testa rota delete", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar um token ao logar", async () => {
    const input = DeleteUserSchema.parse({
      idToDelete: "id-mock-fulano",
      token: "token-mock-fulano",
    });

    const output = await userBusiness.deleteUserById(input);

    expect(output).toEqual({
      message: "Deleção realizada com sucesso",
    });
  });

  test("Token invalido", () => {
    try {
      const input = DeleteUserSchema.parse({
        idToDelete: "u001",
        token: undefined,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues).toEqual([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["token"],
            message: "Required",
          },
        ]);
      }
    }
  });

  test("Deve retornar erro caso ID seja de outro user", async () => {
    expect.assertions(1);
    try {
      const input = DeleteUserSchema.parse({
        idToDelete: "u002",
        token: "token-mock-fulano",
      });

      const output = await userBusiness.deleteUserById(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("somente quem criou a conta pode deletá-la");
      }
    }
  });
});
