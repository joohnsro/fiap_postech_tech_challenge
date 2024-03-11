import { Cliente } from "../../core/entities/cliente";
import { ClienteGatewayInterface } from "../../common/interfaces/gateways";
import { AdicionaClienteDTO } from "../../common/types/cliente";
import Cpf from "../../core/value-objects/cpf";

export default class ClienteUseCase {

    static async criarCliente(adicionaClienteDTO: AdicionaClienteDTO, gateway: ClienteGatewayInterface): Promise<Cliente> {
        Cliente.validaDadosDeEntrada(adicionaClienteDTO)
        const cliente = await ClienteUseCase.encontrarClientePorCPF(adicionaClienteDTO.cpf, gateway)
        
        if ( cliente ) {
            throw new Error('Cliente já cadastrado.')
        }

        return await gateway.criarCliente(adicionaClienteDTO)
    }

    static async encontrarClientePorCPF(clienteCPF: string, gateway: ClienteGatewayInterface): Promise<Cliente | null> {
        const cpf = Cpf.criar(clienteCPF)
        return await gateway.encontrarClientePorCPF(cpf.valor)
    }

}