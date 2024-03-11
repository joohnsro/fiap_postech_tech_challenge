import { ClienteGatewayInterface } from "../../../common/interfaces/gateways";
import { ClienteDataSourceInterface } from "../../../common/interfaces/datasource";
import { AdicionaClienteDTO } from "../../../common/types/cliente";
import { Cliente } from "../../../core/entities/cliente";

export default class MariaDBClienteGateway implements ClienteGatewayInterface {

    private readonly dataSource: ClienteDataSourceInterface;

    constructor(dataSource: ClienteDataSourceInterface) {
        this.dataSource = dataSource
    }
    
    async criarCliente(adicionaClienteDTO: AdicionaClienteDTO): Promise<Cliente> {
        const clienteId = await this.dataSource.criarCliente(adicionaClienteDTO)
        return new Cliente({
            id: clienteId,
            ...adicionaClienteDTO
        })
    }

    async encontrarClientePorCPF(cpf: string): Promise<Cliente | null> {
        const resposta = await this.dataSource.encontrarClientePorCPF(cpf)

        if ( resposta === null || resposta === undefined || resposta.length < 1 ) {
            return null
        }

        return new Cliente(resposta[0])
    }

}