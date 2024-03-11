import { ClienteDataSourceInterface } from "../../common/interfaces/datasource"
import { AdicionaClienteDTO, ClienteDTO } from "../../common/types/cliente"

export default class InMemoryCliente implements ClienteDataSourceInterface {
    
    private clientes: ClienteDTO[] = [
        { id: 1, nome: 'Fulano', cpf: '111.222.333-44' },
        { id: 2, nome: 'Ciclano', cpf: '555.666.777-88' },
    ]

    async criarCliente(adicionaClienteDTO: AdicionaClienteDTO): Promise<number> {
        const tempClientes: ClienteDTO[] = [...this.clientes]
        if ( tempClientes.length > 1 ) {
            tempClientes.sort((a: ClienteDTO, b: ClienteDTO): any => {
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

        const cliente = {id: clienteId, ...adicionaClienteDTO}
        this.clientes.push(cliente)
        
        return clienteId
    }

    async encontrarClientePorCPF(cpf: string): Promise<ClienteDTO[]> {
        return this.clientes.filter(cliente => cliente.cpf === cpf)
    }
}