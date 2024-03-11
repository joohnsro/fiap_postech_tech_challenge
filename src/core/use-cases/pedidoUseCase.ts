import { PagamentoPorPedido, Pedido, ProdutoPorPedido } from "../../core/entities/pedido";
import { PedidoGatewayInterface } from "../../common/interfaces/gateways";
import { AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, Status, StatusPagamento } from "../../common/types/pedido";

export default class PedidoUseCase {

    static async criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, adicionaProdutosPorPedido: AdicionaProdutoPorPedidoDTO[], gateway: PedidoGatewayInterface): Promise<Pedido> {
        Pedido.validaDadosDeEntrada(adicionaPedidoDTO)
        if ( ! adicionaPedidoDTO.observacao ) {
            adicionaPedidoDTO.observacao = ''
        }
        return await gateway.criarPedido(adicionaPedidoDTO, Status.Invalido)
            .then(async (pedido: Pedido) => {
                adicionaProdutosPorPedido.map(async (adicionaProdutoPorPedido: AdicionaProdutoPorPedidoDTO) => {
                    await PedidoUseCase.criarProdutoPorPedido(pedido, adicionaProdutoPorPedido, gateway)
                })
                return pedido
            })
            .then(async pedido => {
                await PedidoUseCase.criarPagamentoPorPedido(pedido.id, gateway)
                return pedido
            })
    }

    static async criarProdutoPorPedido(pedido: Pedido, adicionarProdutoPorPedido: AdicionaProdutoPorPedidoDTO, gateway: PedidoGatewayInterface): Promise<ProdutoPorPedido> {
        ProdutoPorPedido.validaDadosDeEntrada(adicionarProdutoPorPedido)
        return await gateway.criarProdutoPorPedido(pedido, adicionarProdutoPorPedido)
    }

    static async criarPagamentoPorPedido(pedidoId: number, gateway: PedidoGatewayInterface): Promise<PagamentoPorPedido> {
        if ( ! pedidoId || isNaN(pedidoId) ) {
            throw new Error('O pagamento do pedido não possui um formato válido.')
        }
        return await gateway.criarPagamentoPorPedido(pedidoId, StatusPagamento.CONT)
    }

    static async encontrarPedidoPorId(pedidoId: number, gateway: PedidoGatewayInterface): Promise<Pedido> {
        const pedido = await gateway.encontrarPedidoPorId(pedidoId)

        if ( ! pedido ) {
            throw new Error('Pedido não encontrado.')
        }

        return pedido;
    }

    static async encontrarProdutosPorPedidoPorPedidoId(pedidoId: number, gateway: PedidoGatewayInterface): Promise<ProdutoPorPedido[]> {
        return await gateway.encontrarProdutosPorPedidoPorPedidoId(pedidoId)
    }

    static async alterarStatusDoPedido(pedidoId: number, status: number, gateway: PedidoGatewayInterface): Promise<Pedido> {
        const resposta = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)

        if ( ! resposta ) {
            throw new Error('Pedido não encontrado.')
        }

        const pedido = new Pedido({
            id: resposta.id,
            clienteId: resposta.clienteId,
            data: resposta.data,
            status: status,
            valor: resposta.valor
        })
        return await gateway.alterarStatusDoPedido(pedido)
    }

    static async listarPedidos(gateway: PedidoGatewayInterface): Promise<Pedido[] | null> {
        return await gateway.listarPedidos()
    }

    static async consultarStatusDoPagamento(pedidoId: number, gateway: PedidoGatewayInterface): Promise<PagamentoPorPedido> {
        const resposta = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)

        if ( ! resposta ) {
            throw new Error('Pedido não encontrado.')
        }

        return await gateway.consultarStatusDoPagamento(pedidoId)
    }

    static async alterarStatusDoPagamento(pedidoId: number, status: string, gateway: PedidoGatewayInterface): Promise<PagamentoPorPedido> {
        const resposta = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)

        if ( ! resposta ) {
            throw new Error('Pedido não encontrado.')
        }

        return await gateway.alterarStatusDoPagamento(pedidoId, status)
    }
}