import { BadRequestError } from "../../src/errors/BadRequestError";

describe("BadRequestError Test", () => {
  test("Deve criar um BadRequestError com código de status 400 e mensagem padrão", () => {
    const error = new BadRequestError();

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe("Requisição inválida");
  });

  test("Criar um BadRequestError com menssagem customizada", () => {
    const customMessage = "Custom error message";
    const error = new BadRequestError(customMessage);

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe(customMessage);
  });
});
