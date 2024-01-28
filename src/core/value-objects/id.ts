import AssertionConcern from "../application/asserts/assertionConcern";

interface IdType {
    valor: number
}

export default class Id implements IdType {
    public valor: number

    private constructor(id: number) {
        this.valor = id
    }

    public static criar(id: number): Id {
        AssertionConcern.AssertArgumentNotNull(id, "O campo indexador possui um formato inválido.")
        AssertionConcern.AssertArgumentNotNumber(id, "O campo indexador possui um formato inválido.")
        AssertionConcern.AssertArgumentNotBiggerThanZero(id, "O campo indexador possui um formato inválido.")

        return new Id(id)
    }
}