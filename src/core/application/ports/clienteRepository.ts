import { ClienteType } from "../../domain/cliente"

export default interface ClienteRepository {
    criaCliente(cliente: ClienteType): Promise<number>
    encontraClientePorCPF(cpf: string): Promise<ClienteType>
}