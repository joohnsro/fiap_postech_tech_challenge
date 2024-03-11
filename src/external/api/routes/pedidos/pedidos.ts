import { Request, Response } from "express"
import { PedidoController } from "../../../../operation/controllers/pedidoController"
import MariaDBPedido from "../../../mariadb/mariaDBPedido"
import { AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, ProdutoPorPedidoDTO } from "../../../../common/types/pedido"

export default {
    listarPedidos: async(req: Request, res: Response) => {
        const dataSource = new MariaDBPedido()
        await PedidoController.listarPedidos(dataSource)
            .then(pedidos => res.send(pedidos))
            .catch(error => res.send({error: error.message}))
    },
    alterarStatusDoPedido: async(req: Request, res: Response) => {
        const {pedidoId} = req.params
        const {status} = req.body
        const dataSource = new MariaDBPedido()
        await PedidoController.alterarStatusDoPedido(parseInt(pedidoId), status, dataSource)
            .then(pedido => res.send(pedido))
            .catch(error => res.send({error: error.message}))
    },
    checkout: async(req: Request, res: Response) => {
        const {pedido} = req.body
        const dataSource = new MariaDBPedido()

        const pedidoDTO: AdicionaPedidoDTO = {
            clienteId: pedido.clienteId,
            data: pedido.data,
            valor: pedido.valor
        }

        const produtosPorPedidoDTO: ProdutoPorPedidoDTO[] = pedido.produtos && pedido.produtos.length > 0
            ? pedido.produtos.map((produto: AdicionaProdutoPorPedidoDTO) => ({
                produtoId: produto.produtoId,
                quantidade: produto.quantidade,
            }))
            : []

        await PedidoController.criarPedido(pedidoDTO, produtosPorPedidoDTO, dataSource)
            .then(pedido => res.send(pedido))
            .catch(error => res.send({error: error.message}))
    },
    consultarStatusDoPagamento: async (req: Request, res: Response) => {
        const {pedidoId} = req.params
        const dataSource = new MariaDBPedido()

        await PedidoController.consultarStatusDoPagamento(parseInt(pedidoId), dataSource)
            .then(status => res.send(status))
            .catch(error => res.send({error: error.message}))
    }
}