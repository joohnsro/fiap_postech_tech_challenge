import ClienteRepository from "../ports/clienteRepository"
import { Cliente, ClienteType } from "../../domain/cliente"
import Cpf from "../../value-objects/cpf"

export default class ClienteService {
    constructor(private readonly clienteRepository: ClienteRepository) {}

    async criaCliente(data: ClienteType) {
        const cliente = new Cliente(data)
        return await this.clienteRepository.criaCliente(cliente)
    }

    async encontraClientePorCPF(cpfString: string) {
        const cpf = Cpf.criar(cpfString)
        return await this.clienteRepository.encontraClientePorCPF(cpf.valor)
            .then(response => {
                if ( ! response ) {
                    throw new Error(`Cliente não encontrado.`)
                }
                return response
            })
    }
}