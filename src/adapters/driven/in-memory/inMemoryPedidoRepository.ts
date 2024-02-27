import PedidoRepository from "../../../core/application/ports/pedidoRepository"
import { PedidoType, Status, ProdutoPorPedidoType } from "../../../core/domain/pedido";

export default class InMemoryPedidoRepository implements PedidoRepository {
    private pedidos: PedidoType[] = [
        { id: 1, clienteId: 1, data: '2023-12-28 19:00:00', status: Status.Pronto, valor: 60.8 },
        { id: 2, clienteId: 2, data: '2023-12-28 19:40:00', status: Status.EmPreparacao, valor: 30.4 },
    ] 

    private produtosPorPedido: ProdutoPorPedidoType[] = [
        { id: 1, pedidoId: 1, produtoId: 1, quantidade: 2 }, 
        { id: 2, pedidoId: 1, produtoId: 2, quantidade: 2 },
        { id: 3, pedidoId: 2, produtoId: 1, quantidade: 1 }
    ]
    
    async criaPedido(pedido: PedidoType): Promise<number> {
        const tempPedidos: PedidoType[] = [...this.pedidos]
        if ( tempPedidos.length > 1 ) {
            tempPedidos.sort((a: PedidoType, b: PedidoType): any => {
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

        pedido.id = pedidoId
        this.pedidos.push(pedido)

        return pedidoId
    }

    async criaProdutoPorPedido(produtoPorPedido: ProdutoPorPedidoType): Promise<number> {
        const tempPedidos: PedidoType[] = [...this.pedidos]
        if ( tempPedidos.length > 1 ) {
            tempPedidos.sort((a: PedidoType, b: PedidoType): any => {
                if ( a.id && b.id ) {
                    return a.id - b.id
                } else {
                    return false
                }
            })
            tempPedidos.reverse()
        }

        let ultimoId: number|undefined = tempPedidos[0] ? tempPedidos[0].id : 0
        let produtoPorPedidoId = ultimoId ? ultimoId + 1 : 1

        const { pedidoId, produtoId, quantidade } = produtoPorPedido
        this.produtosPorPedido.push({id: produtoPorPedidoId, pedidoId, produtoId, quantidade})

        return produtoPorPedidoId;
    }
    
    async encontraPedido(pedidoId: number): Promise<PedidoType> {
        const posicaoPedido = this.pedidos.map(item => item.id).indexOf(pedidoId)

        if ( posicaoPedido === -1 ) {
            throw new Error('Pedido não encontrado')
        }

        return this.pedidos[posicaoPedido]
    }

    async atualizaPedido(pedido: PedidoType): Promise<PedidoType> {
        const buscaPedidoPorId = this.pedidos.filter(item => item.id === pedido.id)
        if ( ! buscaPedidoPorId[0] ) {
            throw new Error('Pedido não encontrado asasas')
        }

        this.pedidos.forEach(item => {
            if ( item.id === pedido.id ) {
                pedido.status = item.status
                pedido.observacao = item.observacao
                pedido.valor = item.valor
            }
        })

        return this.pedidos.filter(item => item.id === pedido.id)[0]
    }

    async listaPedidos(): Promise<PedidoType[]> {
        return this.pedidos
    }
}