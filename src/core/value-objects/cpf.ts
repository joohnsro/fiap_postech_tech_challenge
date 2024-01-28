import AssertionConcern from "../application/asserts/assertionConcern";

interface CpfType {
    valor: string
}

export default class Cpf implements CpfType {
    public valor: string

    private constructor(cpf: string) {
        this.valor = cpf
    }

    public static criar(cpf: string): Cpf {
        AssertionConcern.AssertArgumentNotEmpty(cpf, "O cpf é obrigatório.")
        const pattern = /(\d{3}\.\d{3}\.\d{3}-\d{2})/g;
        AssertionConcern.AssertArgumentMatches(pattern, cpf, "Cpf inválido.")
        AssertionConcern.AssertArgumentNotEquals(cpf.length, 14, "Cpf inválido.")

        return new Cpf(cpf)
    }
}