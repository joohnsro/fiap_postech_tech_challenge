import { describe, expect, test } from "@jest/globals"
import { AdicionaClienteDTO } from "../src/common/types/cliente.ts"
import InMemoryCliente from "../src/external/in-memory/inMemoryCliente.ts"
import InMemoryClienteGateway from "../src/operation/gateways/in-memory/inMemoryClienteGateway.ts"
import ClienteUseCase from "../src/core/use-cases/clienteUseCase.ts"

describe('Casos de uso do cliente', () => {

    test('Cadastrar um cliente', async () => {
        const adicionaClienteDTO: AdicionaClienteDTO = {
            nome: 'Jonathan Oliveira',
            cpf: '123.456.789-12'
        }

        const dataSource = new InMemoryCliente()
        const gateway = new InMemoryClienteGateway(dataSource)
        const cliente = await ClienteUseCase.criarCliente(adicionaClienteDTO, gateway)

        expect(cliente.id).toBe(3)
    })

    test('Identifica cliente por CPF', async () => {
        const cpf = '111.222.333-44'

        const dataSource = new InMemoryCliente()
        const gateway = new InMemoryClienteGateway(dataSource)
        const cliente = await ClienteUseCase.encontrarClientePorCPF(cpf, gateway)

        expect(cliente?.nome).toBe('Fulano')
    })
})