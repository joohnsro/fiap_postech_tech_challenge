import PedidoRepository from "../../../core/application/ports/pedidoRepository"
import { Pedido, Status } from "../../../core/domain/pedido";

export default class InMemoryPedidoRepository implements PedidoRepository {
    private pedidos: Pedido[] = [
        { id: 1, clienteId: 1, data: '2023-12-28 19:00:00', status: Status.Pronto, produtos: [ { produtoId: 1, quantidade: 2 }, { produtoId: 2, quantidade: 2 } ] },
        { id: 2, clienteId: 2, data: '2023-12-28 19:40:00', status: Status.EmPreparacao, produtos: [ { produtoId: 1, quantidade: 1 } ] },
    ] 
    
    async pagaPedido(valor: number): Promise<boolean> {

        const pedidoPago = true
        if ( ! pedidoPago ) {
            throw new Error('Pagamento não autorizado.')
        }

        return true
    }

    async criaPedido(pedido: Pedido): Promise<number> {
        const tempPedidos: Pedido[] = [...this.pedidos]
        if ( tempPedidos.length > 1 ) {
            tempPedidos.sort((a: Pedido, b: Pedido): any => {
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

    async listaPedidos(): Promise<Pedido[]> {
        return this.pedidos
    }
}