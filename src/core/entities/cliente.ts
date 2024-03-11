import AssertionConcern from "../../common/asserts/assertionConcern"
import { AdicionaClienteDTO, ClienteDTO } from "../../common/types/cliente"
import Cpf from "../../core/value-objects/cpf"

export class Cliente {

    private _id: number
    private _nome: string
    private _cpf: Cpf

    constructor(cliente: ClienteDTO) {
        Cliente.validaDadosDeEntrada(cliente)

        if ( ! cliente.id ) {
            throw new Error('O cliente não possui um formato válido.')
        }

        this._id = cliente.id
        this._nome = cliente.nome
        this._cpf = Cpf.criar(cliente.cpf)
    }

    get id() : number {
        return this._id
    }

    get nome() : string {
        return this._nome
    }

    get cpf() : string {
        return this._cpf.valor
    }

    public static validaDadosDeEntrada(cliente: AdicionaClienteDTO | ClienteDTO) {
        AssertionConcern.AssertArgumentNotEmpty(cliente.nome, 'O cliente não possui um formato válido.')
        let pattern = /^[a-zA-ZÀ-ÿ\s\.]*$/g;
        AssertionConcern.AssertArgumentMatches(pattern, cliente.nome, 'O cliente não possui um formato válido.')
    }

}