import { Request, Response } from "express"
import { ClienteController } from "../../../../operation/controllers/clienteController"
import { AdicionaClienteDTO } from "../../../../common/types/cliente"
import MariaDBCliente from "../../../mariadb/mariaDBCliente"

export default {
    encontrarClientePorCPF: async (req: Request, res: Response) => {
        const cpf: string = req.query.q && req.query.q != '' ? String(req.query.q) : ''
        const dataSource = new MariaDBCliente()
        await ClienteController.encontrarClientePorCPF(cpf, dataSource)
            .then(cliente => res.send(cliente))
            .catch(error => res.send({error: error.message}))
    },
    criarCliente: async (req: Request, res: Response) => {
        const adicionaClienteDTO: AdicionaClienteDTO = {...req.body}
        const dataSource = new MariaDBCliente()
        await ClienteController.criarCliente(adicionaClienteDTO, dataSource)
            .then(cliente => res.send(cliente))
            .catch(error => res.send({error: error.message}))
    }
}