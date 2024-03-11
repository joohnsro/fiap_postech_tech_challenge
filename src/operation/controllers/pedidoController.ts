import { PedidoDataSourceInterface } from "../../common/interfaces/datasource";
import { AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, PedidoDTO, ProdutoPorPedidoDTO, Status, StatusPagamento } from "../../common/types/pedido";
import PedidoUseCase from "../../core/use-cases/pedidoUseCase";
import MariaDBPedidoGateway from "../gateways/mariadb/mariaDBPedidoGateway";
import { PedidoPresenter } from "../presenters/pedidoPresenter";

export class PedidoController {
    static async listarPedidos(dataSource: PedidoDataSourceInterface) {
        const gateway = new MariaDBPedidoGateway(dataSource)

        try {
            const listaPedidos = await PedidoUseCase.listarPedidos(gateway)
            
            if ( ! listaPedidos ) {
                return null
            }

            const pedidosComProdutosDTO = await Promise.all(listaPedidos.map(async (pedido: PedidoDTO) => {
                const produtos: ProdutoPorPedidoDTO[] = await PedidoUseCase.encontrarProdutosPorPedidoPorPedidoId(pedido.id, gateway)
                return {
                    id: pedido.id,
                    clienteId: pedido.clienteId,
                    data: pedido.data,
                    status: pedido.status,
                    valor: pedido.valor,
                    observacao: pedido.observacao,
                    produtos: produtos.map((produto: ProdutoPorPedidoDTO) => ({
                        produtoId: produto.produtoId,
                        pedidoId: produto.pedidoId,
                        quantidade: produto.quantidade,
                    }))
                }
            }))

            return PedidoPresenter.comProdutosToDTOList(await pedidosComProdutosDTO)
        } catch(err) {
            throw new Error("Não foi possível listar os pedidos.")
        }
    }

    static async criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, adicionaProdutosPorPedidoDTO: AdicionaProdutoPorPedidoDTO[], dataSource: PedidoDataSourceInterface) {
        const gateway = new MariaDBPedidoGateway(dataSource)
        try {
            const pedidoCadastrado = await PedidoUseCase.criarPedido(adicionaPedidoDTO, adicionaProdutosPorPedidoDTO, gateway)
            return PedidoPresenter.getId(pedidoCadastrado)
        } catch(err) {
            throw new Error("Não foi possível criar o pedido.")
        }
    }

    static async alterarStatusDoPedido(pedidoId: number, status: Status, dataSource: PedidoDataSourceInterface) {
        const gateway = new MariaDBPedidoGateway(dataSource)
        try {
            const pedidoAtualizado = await PedidoUseCase.alterarStatusDoPedido(pedidoId, status, gateway)
            return PedidoPresenter.toDTO(pedidoAtualizado)
        } catch(err) {
            throw new Error("Não foi possível alterar o status do pedido.")
        }
    }

    static async encontrarPedidoPorId(pedidoId: number, dataSource: PedidoDataSourceInterface) {
        const gateway = new MariaDBPedidoGateway(dataSource)
        try {
            const pedido = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)
            const produtosPorPedido = await PedidoUseCase.encontrarProdutosPorPedidoPorPedidoId(pedidoId, gateway)

            if ( ! pedido ) {
                throw new Error('Pedido não encontrado.')
            }

            return PedidoPresenter.comProdutosToDTO(pedido, produtosPorPedido)
        } catch(err) {
            throw new Error("Não foi possível encontrar o pedido.")
        }
    }

    static async consultarStatusDoPagamento(pedidoId: number, dataSource: PedidoDataSourceInterface) {
        const gateway = new MariaDBPedidoGateway(dataSource)
        try {
            const pagamentoPorPedido = await PedidoUseCase.consultarStatusDoPagamento(pedidoId, gateway)
            return PedidoPresenter.getStatus(pagamentoPorPedido)
        } catch(err) {
            throw new Error("Não foi possível encontrar o status do pagamento.")
        }
    }

    static async alterarStatusDoPagamento(pedidoId: number, status: StatusPagamento, dataSource: PedidoDataSourceInterface) {
        const gateway = new MariaDBPedidoGateway(dataSource)
        try {
            const pagamentoPorPedido = await PedidoUseCase.alterarStatusDoPagamento(pedidoId, status, gateway)
            return PedidoPresenter.getStatus(pagamentoPorPedido)
        } catch(err) {
            throw new Error("Não foi possível alterar o status do pagamento.")
        }
    }
}