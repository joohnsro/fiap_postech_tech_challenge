import { Request, Response } from "express"
import { Cliente } from "../../../../../core/domain/cliente"
import InMemoryClienteRepository from "../../../../driven/in-memory/inMemoryClienteRepository"
import ClienteService from "../../../../../core/application/services/clienteService"

const repository = new InMemoryClienteRepository()
const service = new ClienteService(repository)

export default {
    encontraClientePorCPF: async(req: Request, res: Response) => {
        const cpf: string = req.query.cpf && req.query.cpf != '' ? String(req.query.cpf) : ''
        await service.encontraClientePorCPF(cpf)
            .then(cliente => res.send(cliente))
            .catch(error => res.send({error: error.message}))
    },
    criaCliente: async (req: Request, res: Response) => {
        const cliente: Cliente = {...req.body}
        await service.criaCliente(cliente)
            .then(clienteId => res.send({id: clienteId}))
            .catch(error => res.send({error: error.message}))
    }
}