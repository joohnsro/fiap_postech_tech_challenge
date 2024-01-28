import { describe, test, expect } from "@jest/globals"
import { ClienteType } from "../src/core/domain/cliente"
import ClienteService from "../src/core/application/services/clienteService"
import InMemoryClienteRepository from "../src/adapters/driven/in-memory/inMemoryClienteRepository"

describe('Serviços do cliente', () => {

    test('Cadastrar um cliente', async () => {
        const data: ClienteType = {
            nome: 'Jonathan Oliveira',
            cpf: '123.456.789-12'
        }

        const repository = new InMemoryClienteRepository()
        const service = new ClienteService(repository)

        const clienteId = await service.criaCliente(data)
        expect(clienteId).toBe(3)
    })

    test('Identifica cliente por CPF', async () => {
        const cpf: string = '111.222.333-44'

        const repository = new InMemoryClienteRepository()
        const service = new ClienteService(repository)

        const cliente: ClienteType = await service.encontraClientePorCPF(cpf)
        expect(cliente.nome).toBe('Fulano')
    })
})