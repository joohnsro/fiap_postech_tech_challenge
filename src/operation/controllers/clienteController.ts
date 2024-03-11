import { AdicionaClienteDTO } from "../../common/types/cliente";
import { ClienteDataSourceInterface } from "../../common/interfaces/datasource"
import ClienteUseCase from "../../core/use-cases/clienteUseCase";
import { ClientePresenter } from "../presenters/clientePresenter";
import MariaDBClienteGateway from "../gateways/mariadb/mariaDBClienteGateway";

export class ClienteController {
    static async criarCliente(adicionaClienteDTO: AdicionaClienteDTO, dataSource: ClienteDataSourceInterface) {
        const gateway = new MariaDBClienteGateway(dataSource)

        try {
            const clienteCadastrado = await ClienteUseCase.criarCliente(adicionaClienteDTO, gateway)
            return ClientePresenter.toDTO(clienteCadastrado)
        } catch(err) {
            throw new Error("Não foi possível cadastrar o cliente.")
        }
    }

    static async encontrarClientePorCPF(cpf: string, dataSource: ClienteDataSourceInterface) {
        const gateway = new MariaDBClienteGateway(dataSource)

        try {
            const clienteEncontrado = await ClienteUseCase.encontrarClientePorCPF(cpf, gateway)

            if ( ! clienteEncontrado ) {
                throw new Error("Nenhum cliente encontrado com esse CPF.")
            }

            return ClientePresenter.toDTO(clienteEncontrado)
        } catch(err) {
            throw new Error("Não foi possível encontrar o cliente.")
        }
    }
}