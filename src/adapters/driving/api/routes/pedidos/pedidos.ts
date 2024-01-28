import { Request, Response } from "express"
import { ProdutoPorPedidoType } from "../../../../../core/domain/pedido"
import MariaDBPedidoRepository from "../../../../driven/mariadb/ports/mariaDBPedidoRepository"
import PedidoService from "../../../../../core/application/services/pedidoService"

const repository = new MariaDBPedidoRepository()
const service = new PedidoService(repository)

export default {
    listaPedidos: async(req: Request, res: Response) => {
        await service.listaPedidos()
            .then(pedidos => res.send(pedidos))
            .catch(error => res.send({error: error.message}))
    },
    checkout: async(req: Request, res: Response) => {
        const {pedido, produtos} = req.body

        const pedidoPago = true
        if ( ! pedidoPago ) {
            throw new Error('Pagamento não autorizado.')
        }

        await service.criaPedido(pedido)
            .then(pedidoId => {
                produtos.forEach(async (produto: ProdutoPorPedidoType) => {
                    await service.criaProdutoPorPedido({...produto, pedidoId})
                })
                res.send({id: pedidoId})
            })
            .catch(error => res.send({error: error.message}))
    }
}