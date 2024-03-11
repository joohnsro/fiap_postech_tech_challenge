import { PedidoComProdutosDTO, ProdutoPorPedidoDTO, StatusName } from "../../common/types/pedido";
import { PagamentoPorPedido, Pedido } from "../../core/entities/pedido";

export class PedidoPresenter {
    static toDTO(pedido: Pedido) {
        const pedidoDTO = {
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor
        }

        return {
            id: pedidoDTO.id,
            clienteId: pedidoDTO.clienteId,
            data: pedidoDTO.data,
            observacao: pedidoDTO.observacao,
            status: pedidoDTO.status,
            valor: pedidoDTO.valor
        }
    }

    static toDTOList(pedidos: Pedido[]) {
        const pedidosDTO = pedidos.map(pedido => ({
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor
        }))

        return pedidosDTO.map(pedido => ({
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor
        }))
    }

    static comProdutosToDTO(pedido: Pedido, produtos: ProdutoPorPedidoDTO[]) {
        const pedidoDTO = {
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor
        }

        const produtosDTO = produtos.map(produto => ({
            pedidoId: produto.pedidoId,
            produtoId: produto.produtoId,
            quantidade: produto.quantidade
        }))

        return {
            ...pedidoDTO,
            produtos: produtosDTO
        }
    }

    static comProdutosToDTOList(pedidosComProdutosDTO: PedidoComProdutosDTO[]) {

        const pedidosDTO = pedidosComProdutosDTO.map(pedido => ({
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: StatusName[pedido.status],
            valor: pedido.valor,
            produtos: pedido.produtos
        }))

        return pedidosComProdutosDTO.map(pedido => {
            return {
                id: pedido.id,
                clienteId: pedido.clienteId,
                data: pedido.data,
                observacao: pedido.observacao,
                status: StatusName[pedido.status],
                valor: pedido.valor,
                produtos: pedido.produtos
            }
        })
    }

    static getId(pedido: Pedido) {
        const pedidoDTO = pedido
        return {id: pedidoDTO.id}
    }

    static getStatus(pedido: PagamentoPorPedido) {
        const pedidoDTO = pedido
        return {status: pedidoDTO.status}
    }
}