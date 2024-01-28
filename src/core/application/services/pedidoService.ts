import { Pedido, PedidoType, ProdutoPorPedido, ProdutoPorPedidoType } from "../../domain/pedido"
import PedidoRepository from "../../application/ports/pedidoRepository"

export default class PedidoService {
    constructor(private readonly pedidoRepository: PedidoRepository) {}

    async criaPedido(data: PedidoType): Promise<number> {
        const pedido = new Pedido(data)
        return await this.pedidoRepository.criaPedido(pedido)
    }

    async criaProdutoPorPedido(data: ProdutoPorPedidoType): Promise<number> {
        const produtoPorPedido = new ProdutoPorPedido(data)
        return await this.pedidoRepository.criaProdutoPorPedido(produtoPorPedido)
    }

    async listaPedidos(): Promise<PedidoType[]> {
        return await this.pedidoRepository.listaPedidos()
    }
}