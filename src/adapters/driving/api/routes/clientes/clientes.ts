import { Request, Response } from "express"
import { ClienteType } from "../../../../../core/domain/cliente"
import MariaDBClienteRepository from "../../../../driven/mariadb/ports/mariaDBClienteRepository"
import ClienteService from "../../../../../core/application/services/clienteService"

const repository = new MariaDBClienteRepository()
const service = new ClienteService(repository)

export default {
    encontraClientePorCPF: async(req: Request, res: Response) => {
        const cpf: string = req.query.q && req.query.q != '' ? String(req.query.q) : ''
        await service.encontraClientePorCPF(cpf)
            .then(cliente => res.send(cliente))
            .catch(error => res.send({error: error.message}))
    },
    criaCliente: async (req: Request, res: Response) => {
        const cliente: ClienteType = {...req.body}
        await service.criaCliente(cliente)
            .then(clienteId => res.send({id: clienteId}))
            .catch(error => res.send({error: error.message}))
    }
}