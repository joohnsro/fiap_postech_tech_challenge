import { describe, test, expect } from "@jest/globals"
import { Cliente } from "../src/core/domain/cliente"
import ClienteService from "../src/core/application/services/clienteService"
import InMemoryClienteRepository from "../src/adapters/driven/in-memory/inMemoryClienteRepository"

describe('Serviços do cliente', () => {

    test('Cadastrar um cliente', async () => {
        const cliente: Cliente = {
            nome: 'Jonathan Oliveira',
            cpf: '123.456.789-12'
        }

        const repository = new InMemoryClienteRepository()
        const service = new ClienteService(repository)

        const clienteId = await service.criaCliente(cliente)
        expect(clienteId).toBe(3)
    })

    test('Identifica cliente por CPF', async () => {
        const cpf: string = '111.222.333-44'

        const repository = new InMemoryClienteRepository()
        const service = new ClienteService(repository)

        const cliente: Cliente = await service.encontraClientePorCPF(cpf)
        expect(cliente.nome).toBe('Fulano')
    })
})