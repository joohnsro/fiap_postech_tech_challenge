import { Pedido } from "../../domain/pedido"
import PedidoRepository from "../../application/ports/pedidoRepository"

export default class PedidoService {
    constructor(private readonly pedidoRepository: PedidoRepository) {}

    async pagaPedido(valor: number): Promise<boolean> {
        return await this.pedidoRepository.pagaPedido(valor)
    }

    async criaPedido(pedido: Pedido): Promise<number> {
        return await this.pedidoRepository.criaPedido(pedido)
    }

    async listaPedidos(): Promise<Pedido[]> {
        return await this.pedidoRepository.listaPedidos()
    }
}