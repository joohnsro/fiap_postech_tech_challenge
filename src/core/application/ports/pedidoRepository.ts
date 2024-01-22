import { Pedido } from "../../domain/pedido"

export default interface PedidoService {
    pagaPedido(valor: number): Promise<boolean>
    criaPedido(pedido: Pedido): Promise<number>
    listaPedidos(): Promise<Pedido[]>
}