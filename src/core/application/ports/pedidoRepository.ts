import { PedidoType, ProdutoPorPedidoType } from "../../domain/pedido"

export default interface PedidoRepository {
    criaPedido(pedido: PedidoType): Promise<number>
    criaProdutoPorPedido(produtos: ProdutoPorPedidoType): Promise<number>
    encontraPedido(pedidoId: number): Promise<PedidoType>
    atualizaPedido(pedido: PedidoType): Promise<PedidoType>
    listaPedidos(): Promise<PedidoType[]>
}