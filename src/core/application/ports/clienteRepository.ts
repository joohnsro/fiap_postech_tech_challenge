import { Cliente } from "../../domain/cliente"

export default interface ClienteRepository {
    criaCliente(cliente: Cliente): Promise<number>
    encontraClientePorCPF(cpf: string): Promise<Cliente>
}