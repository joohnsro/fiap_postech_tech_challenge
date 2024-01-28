import AssertionConcern from "../application/asserts/assertionConcern";

interface ValorType {
    valor: number
}

export default class Valor implements ValorType {
    public valor: number

    private constructor(valor: number) {
        this.valor = valor
    }

    public static criar(valor: number): Valor {
        AssertionConcern.AssertArgumentNotNull(valor, "O campo indexador possui um formato inválido.")
        AssertionConcern.AssertArgumentNotNumber(valor, "O campo indexador possui um formato inválido.")
        AssertionConcern.AssertArgumentNotBiggerThanZero(valor, "O campo indexador possui um formato inválido.")

        return new Valor(valor)
    }
}