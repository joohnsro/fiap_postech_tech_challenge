import { describe, test, expect } from "@jest/globals"
import { PedidoType, ProdutoPorPedidoType, Status } from "../src/core/domain/pedido"
import InMemoryPedidoRepository from "../src/adapters/driven/in-memory/inMemoryPedidoRepository"
import PedidoService from "../src/core/application/services/pedidoService"

describe('Serviço de pedidos', () => {

    test('Paga pedido', async () => {
        const data: PedidoType = {
            clienteId: 1,
            data: new Date().toISOString(),
            status: Status.Recebido,
            valor: 30.4
        }

        const pedidoRepository = new InMemoryPedidoRepository()
        const pedidoService = new PedidoService(pedidoRepository)

        const pedidoId = await pedidoService.criaPedido(data)
        expect(pedidoId).toBe(3)
    })
    
    test('Cria produto por pedido', async () => {
        const produto: ProdutoPorPedidoType =  { 
            pedidoId: 2, 
            produtoId: 2, 
            quantidade: 1 
        }

        const pedidoRepository = new InMemoryPedidoRepository()
        const pedidoService = new PedidoService(pedidoRepository)

        const produtoPorPedidoId = await pedidoService.criaProdutoPorPedido(produto)

        expect(produtoPorPedidoId).toBe(3)
    })

    test('Lista pedidos', async () => {
        const repository = new InMemoryPedidoRepository()
        const service = new PedidoService(repository)

        const totalPedidos = (await service.listaPedidos()).length
        expect(totalPedidos).toBe(2)
    })

})