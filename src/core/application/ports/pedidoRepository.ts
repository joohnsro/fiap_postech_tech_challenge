import { PedidoType, ProdutoPorPedidoType } from "../../domain/pedido"

export default interface PedidoRepository {
    criaPedido(pedido: PedidoType): Promise<number>
    criaProdutoPorPedido(produtos: ProdutoPorPedidoType): Promise<number>
    listaPedidos(): Promise<PedidoType[]>
}