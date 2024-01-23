import { Request, Response } from "express"
import { Pedido } from "../../../../../core/domain/pedido"
import InMemoryPedidoRepository from "../../../../driven/in-memory/inMemoryPedidoRepository"
import PedidoService from "../../../../../core/application/services/pedidoService"

const repository = new InMemoryPedidoRepository()
const service = new PedidoService(repository)

export default {
    listaPedidos: async(req: Request, res: Response) => {
        await service.listaPedidos()
            .then(pedidos => res.send(pedidos))
            .catch(error => res.send({error: error.message}))
    },
    criaPedido: async(req: Request, res: Response) => {
        const pedido: Pedido = {...req.body}
        await service.criaPedido(pedido)
            .then(pedidoId => res.send({id: pedidoId}))
            .catch(error => res.send({error: error.message}))
    }
}