import ClienteRepository from "../ports/clienteRepository"
import { Cliente } from "../../domain/cliente"

export default class ClienteService {
    constructor(private readonly clienteRepository: ClienteRepository) {}

    async criaCliente(cliente: Cliente) {
        return await this.clienteRepository.criaCliente(cliente)
    }

    async encontraClientePorCPF(cpf: string) {
        return await this.clienteRepository.encontraClientePorCPF(cpf)
    }
}