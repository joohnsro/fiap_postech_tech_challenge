import { Cliente } from "../../../core/domain/cliente"
import ClienteRepository from "../../../core/application/ports/clienteRepository"

export default class InMemoryClienteRepository implements ClienteRepository {
    
    private clientes: Cliente[] = [
        { id: 1, nome: 'Fulano', cpf: '111.222.333-44' },
        { id: 2, nome: 'Ciclano', cpf: '555.666.777-88' },
    ]

    async criaCliente(cliente: Cliente): Promise<number> {

        const tempClientes: Cliente[] = [...this.clientes]
        if ( tempClientes.length > 1 ) {
            tempClientes.sort((a: Cliente, b: Cliente): any => {
                if ( a.id && b.id ) {
                    return a.id - b.id
                } else {
                    return false
                }
            })
            tempClientes.reverse()
        }

        let ultimoId: number|undefined = tempClientes[0] ? tempClientes[0].id : 0
        let clienteId = ultimoId ? ultimoId + 1 : 1

        cliente.id = clienteId
        this.clientes.push(cliente)
        
        return clienteId
    }

    async encontraClientePorCPF(cpf: string): Promise<Cliente> {

        if ( ! cpf ) {
            throw new Error('CPF inválido.')
        }

        const busca = this.clientes.filter(cliente => cliente.cpf === cpf)

        if ( busca.length === 0 ) {
            throw new Error('Cliente não encontrado.')
        }

        return busca[0]
    }
}