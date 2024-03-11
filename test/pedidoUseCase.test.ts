import { describe, expect, test } from "@jest/globals"
import { AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, Status, StatusPagamento } from "../src/common/types/pedido"
import InMemoryPedido from "../src/external/in-memory/inMemoryPedido"
import InMemoryPedidoGateway from "../src/operation/gateways/in-memory/inMemoryPedidoGateway"
import PedidoUseCase from "../src/core/use-cases/pedidoUseCase"

describe('Casos de uso do cliente', () => {

    test('Cria pedido', async () => {
        const adicionaPedidoDTO: AdicionaPedidoDTO = {
            clienteId: 1,
            data: new Date().toISOString(),
            valor: 30.4
        }

        const adicionaProdutoPorPedidoDTO: AdicionaProdutoPorPedidoDTO[] = [
            { produtoId: 1, quantidade: 2 }
        ]

        const dataSource = new InMemoryPedido()
        const gateway = new InMemoryPedidoGateway(dataSource)
        const pedido = await PedidoUseCase.criarPedido(adicionaPedidoDTO, adicionaProdutoPorPedidoDTO, gateway)
        
        expect(pedido.id).toBe(3)
    })

    test('Cria produto por pedido', async () => {
        const dataSource = new InMemoryPedido()
        const gateway = new InMemoryPedidoGateway(dataSource)

        const pedidoId = 2
        const pedido = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)
        const produtoPorPedidoDTO: AdicionaProdutoPorPedidoDTO =  { 
            produtoId: 2, 
            quantidade: 1 
        }

        const resposta = await PedidoUseCase.criarProdutoPorPedido(pedido, produtoPorPedidoDTO, gateway)

        expect(resposta).toBeTruthy()
    })

    test('Encontra pedido', async () => {

        const id = 1

        const dataSource = new InMemoryPedido()
        const gateway = new InMemoryPedidoGateway(dataSource)
        const pedido = await PedidoUseCase.encontrarPedidoPorId(id, gateway)
        
        expect(pedido?.clienteId).toBe(1)
    })

    test('Altera status do pedido', async () => {
        const dataSource = new InMemoryPedido()
        const gateway = new InMemoryPedidoGateway(dataSource)

        const id = 1
        const status = Status.Pronto

        const pedidoAtualizado = await PedidoUseCase.alterarStatusDoPedido(id, status, gateway)
        
        expect(pedidoAtualizado.status).toBe(Status.Pronto)
    })

    test('Lista pedidos', async () => {
        const dataSource = new InMemoryPedido()
        const gateway = new InMemoryPedidoGateway(dataSource)

        const totalPedidos = await PedidoUseCase.listarPedidos(gateway)
        expect(totalPedidos?.length).toBe(2)
    })

    test('Checar status do pagamento', async () => {
        const dataSource = new InMemoryPedido()
        const gateway = new InMemoryPedidoGateway(dataSource)

        const pedidoId = 2
        const statusDoPagamentoDoPedidoSolicitado = await PedidoUseCase.consultarStatusDoPagamento(pedidoId, gateway)
        expect(statusDoPagamentoDoPedidoSolicitado.status).toBe(StatusPagamento.APRO)
    })

    test('Alterar status do pagamento', async () => {
        const dataSource = new InMemoryPedido()
        const gateway = new InMemoryPedidoGateway(dataSource)

        const pedidoId = 2
        const status = StatusPagamento.CALL
        const novoStatusDoPagamento = await PedidoUseCase.alterarStatusDoPagamento(pedidoId, status, gateway)
        expect(novoStatusDoPagamento.status).toBe(StatusPagamento.CALL)
    })
    
})