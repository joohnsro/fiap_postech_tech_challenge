import { PedidoGatewayInterface } from "../../../common/interfaces/gateways";
import { PedidoDataSourceInterface } from "../../../common/interfaces/datasource";
import { AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, PedidoDTO, Status, StatusPagamento } from "../../../common/types/pedido";
import { PagamentoPorPedido, Pedido, ProdutoPorPedido } from "../../../core/entities/pedido";

export default class InMemoryPedidoGateway implements PedidoGatewayInterface {

    private readonly dataSource: PedidoDataSourceInterface;

    constructor(dataSource: PedidoDataSourceInterface) {
        this.dataSource = dataSource
    }

    async criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, status: Status): Promise<Pedido> {
        const pedidoId = await this.dataSource.criarPedido(adicionaPedidoDTO, status)

        return new Pedido({
            id: pedidoId,
            clienteId: adicionaPedidoDTO.clienteId,
            data: adicionaPedidoDTO.data,
            observacao: adicionaPedidoDTO.observacao,
            status: Status.Invalido,
            valor: adicionaPedidoDTO.valor
        })
    }
    
    async criarProdutoPorPedido(pedido: Pedido, produtoPorPedidoDTO: AdicionaProdutoPorPedidoDTO): Promise<ProdutoPorPedido> {
        await this.dataSource.criarProdutoPorPedido(pedido.id, produtoPorPedidoDTO)
        return new ProdutoPorPedido({
            pedidoId: pedido.id,
            ...produtoPorPedidoDTO
        })
    }

    async encontrarPedidoPorId(pedidoId: number): Promise<Pedido | null> {
        const resposta = await this.dataSource.encontrarPedidoPorId(pedidoId)

        if ( resposta === null || resposta === undefined ) {
            return null
        }

        return new Pedido(resposta)
    }

    async encontrarProdutosPorPedidoPorPedidoId(pedidoId: number): Promise<ProdutoPorPedido[]> {
        const produtos = await this.dataSource.encontrarProdutosPorPedidoPorPedidoId(pedidoId)
        return produtos.map(produto => new ProdutoPorPedido(produto))
    }

    async alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<Pedido> {
        const pedidoDataSource = await this.dataSource.alterarStatusDoPedido(pedidoDTO)
        return new Pedido(pedidoDataSource)
    }

    async listarPedidos(): Promise<Pedido[] | null> {
        const pedidosDatasource = await this.dataSource.listarPedidos()

        if ( ! pedidosDatasource ) {
            return null
        }

        return pedidosDatasource.map(pedidoDTO => {
            return new Pedido(pedidoDTO)
        })
    }
    
    async consultarStatusDoPagamento(pedidoId: number): Promise<PagamentoPorPedido> {
        const pagamentoPorpedidoDTO = await this.dataSource.consultarStatusDoPagamento(pedidoId)
        return new PagamentoPorPedido(pagamentoPorpedidoDTO)
    }

    async alterarStatusDoPagamento(pedidoId: number, status: StatusPagamento): Promise<PagamentoPorPedido> {
        await this.dataSource.alterarStatusDoPagamento(pedidoId, status)
        return new PagamentoPorPedido({
            pedidoId, status
        })
    }

    async criarPagamentoPorPedido(pedidoId: number, status: StatusPagamento): Promise<PagamentoPorPedido> {
        await this.dataSource.criarPagamentoPorPedido(pedidoId, status)
        return new PagamentoPorPedido({
            pedidoId, status
        })
    }
}