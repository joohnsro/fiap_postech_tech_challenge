import { describe, test, expect } from "@jest/globals"
import { Pedido, Status } from "../src/core/domain/pedido"
import InMemoryPedidoRepository from "../src/adapters/driven/in-memory/inMemoryPedidoRepository"
import PedidoService from "../src/core/application/services/pedidoService"
import InMemoryProdutoRepository from "../src/adapters/driven/in-memory/inMemoryProdutoRepository"
import ProdutoService from "../src/core/application/services/produtoService"

describe('Serviço de pedidos', () => {

    test('Paga pedido', async () => {
        const pedido: Pedido = {
            clienteId: 1,
            data: new Date().toISOString(),
            status: Status.Recebido,
            produtos: [
                { produtoId: 1, quantidade: 1 },
                { produtoId: 2, quantidade: 1 },
            ]
        }

        const produtoRepository = new InMemoryProdutoRepository()
        const produtoService = new ProdutoService(produtoRepository)
         
        const valorTotal = await produtoService.calculaValorTotalDosProdutos(pedido.produtos)
        expect(valorTotal).toBe(30.4)

        const pedidoRepository = new InMemoryPedidoRepository()
        const pedidoService = new PedidoService(pedidoRepository)

        const servicoPago = await pedidoService.pagaPedido(valorTotal)
        
        if ( servicoPago ) {
            const pedidoId = await pedidoService.criaPedido(pedido)
            expect(pedidoId).toBe(3)
        }
    })

    test('Lista pedidos', async () => {
        const repository = new InMemoryPedidoRepository()
        const service = new PedidoService(repository)

        const totalPedidos = (await service.listaPedidos()).length
        expect(totalPedidos).toBe(2)
    })

})