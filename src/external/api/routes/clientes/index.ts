import { Router } from "express"
import clientes from "./clientes"

const router = Router()
router.post('/cliente', clientes.criarCliente)
router.get('/clientes/cpf', clientes.encontrarClientePorCPF)

export default router