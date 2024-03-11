import { Cliente } from "../../core/entities/cliente";

export class ClientePresenter {
    static toDTO(cliente: Cliente) {
        const clienteDTO = {
            id: cliente.id,
            nome: cliente.nome,
            cpf: cliente.cpf
        }

        return {
            id: clienteDTO.id,
            nome: clienteDTO.nome,
            cpf: clienteDTO.cpf
        }
    }
}