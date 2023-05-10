import { NotFoundError } from "../../src/errors/NotFoundError";

describe("NotFoundError Test", () => {
  test("Deve criar um BadRequestError com código de status 400 e mensagem padrão", () => {
    const error = new NotFoundError();

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Recurso não encontrado");
  });

  test("Criar um NotFoundError com menssagem customizada", () => {
    const customMessage = "Custom error message";
    const error = new NotFoundError(customMessage);

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe(customMessage);
  });
});
