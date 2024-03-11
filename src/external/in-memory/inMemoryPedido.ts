import { Pedido, ProdutoPorPedido } from "../../core/entities/pedido";
import { PedidoDataSourceInterface } from "../../common/interfaces/datasource";
import { AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, PagamentoPorPedidoDTO, PedidoDTO, ProdutoPorPedidoDTO, Status, StatusPagamento } from "../../common/types/pedido";

export default class InMemoryPedido implements PedidoDataSourceInterface {
    
    private pedidos: PedidoDTO[] = [
        { id: 1, clienteId: 1, data: '2023-12-28 19:00:00', status: Status.Recebido, valor: 60.8 },
        { id: 2, clienteId: 2, data: '2023-12-28 19:40:00', status: Status.EmPreparacao, valor: 30.4 },
    ] 

    private produtosPorPedido: any[] = [
        { pedidoId: 1, produtoId: 1, quantidade: 2 }, 
        { pedidoId: 1, produtoId: 2, quantidade: 2 },
        { pedidoId: 2, produtoId: 1, quantidade: 1 }
    ]

    private pagamentoPorPedido: any[] = [
        { pedidoId: 1, status: StatusPagamento.APRO },
        { pedidoId: 2, status: StatusPagamento.APRO },
        { pedidoId: 3, status: StatusPagamento.CALL },
    ]

    async criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO): Promise<number> {
        const tempPedidos: PedidoDTO[] = [...this.pedidos]
        if ( tempPedidos.length > 1 ) {
            tempPedidos.sort((a: PedidoDTO, b: PedidoDTO): any => {
                if ( a.id && b.id ) {
                    return a.id - b.id
                } else {
                    return false
                }
            })
            tempPedidos.reverse()
        }

        let ultimoId: number|undefined = tempPedidos[0] ? tempPedidos[0].id : 0
        let pedidoId = ultimoId ? ultimoId + 1 : 1

        const pedido = new Pedido({id: pedidoId, status: Status.Invalido, ...adicionaPedidoDTO})
        this.pedidos.push(pedido)

        return pedidoId
    }

    async criarProdutoPorPedido(pedidoId: number, produtoPorPedidoDTO: AdicionaProdutoPorPedidoDTO): Promise<boolean> {
        const tempPedidos: PedidoDTO[] = [...this.pedidos]
        if ( tempPedidos.length > 1 ) {
            tempPedidos.sort((a: PedidoDTO, b: PedidoDTO): any => {
                if ( a.id && b.id ) {
                    return a.id - b.id
                } else {
                    return false
                }
            })
            tempPedidos.reverse()
        }

        const { produtoId, quantidade } = produtoPorPedidoDTO
        this.produtosPorPedido.push({pedidoId, produtoId, quantidade})

        return true;
    }

    async encontrarPedidoPorId(pedidoId: number): Promise<PedidoDTO> {
        const posicaoPedido = this.pedidos.map(item => item.id).indexOf(pedidoId)

        if ( posicaoPedido === -1 ) {
            throw new Error('Pedido não encontrado.')
        }

        const produtos = this.produtosPorPedido.filter(item => item.pedidoId = this.pedidos[posicaoPedido].id)
        const pedido = {
            ...this.pedidos[posicaoPedido],
            produtos
        }

        return pedido
    }

    async encontrarProdutosPorPedidoPorPedidoId(pedidoId: number): Promise<ProdutoPorPedidoDTO[]> {
        return this.produtosPorPedido.filter(item => item.pedidoId = pedidoId)
    }

    async alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<PedidoDTO> {
        this.pedidos.forEach(item => {
            if ( item.id === pedidoDTO.id ) {
                item.status = pedidoDTO.status
            }
        })

        return this.pedidos.filter(item => item.id === pedidoDTO.id)[0]
    }

    async listarPedidos(): Promise<PedidoDTO[]> {
        return this.pedidos
    }

    async consultarStatusDoPagamento(pedidoId: number): Promise<PagamentoPorPedidoDTO> {
        return this.pagamentoPorPedido.filter(pagamento => pagamento.pedidoId === pedidoId)[0]
    }

    async alterarStatusDoPagamento(pedidoId: number, status: string): Promise<boolean> {
        this.pagamentoPorPedido.forEach(pagamento => {
            if ( pagamento.pedidoId == pedidoId ) {
                pagamento.status = status
            }
        })
        return true
    }

    async criarPagamentoPorPedido(pedidoId: number): Promise<boolean> {
        const pagamento = {pedidoId, status: StatusPagamento.CONT}
        this.pagamentoPorPedido.push(pagamento)
        return true
    }
}