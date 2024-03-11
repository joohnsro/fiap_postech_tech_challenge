import AssertionConcern from "../../common/asserts/assertionConcern";

export default class Cpf {
    private readonly _valor: string

    private constructor(cpf: string) {
        this._valor = cpf
    }

    public static criar(cpf: string): Cpf {
        AssertionConcern.AssertArgumentNotEmpty(cpf, "O cpf é obrigatório.")
        const pattern = /(\d{3}\.\d{3}\.\d{3}-\d{2})/g;
        AssertionConcern.AssertArgumentMatches(pattern, cpf, "Cpf inválido.")
        AssertionConcern.AssertArgumentNotEquals(cpf.length, 14, "Cpf inválido.")
        return new Cpf(cpf)
    }

    get valor() {
        return this._valor
    }
}