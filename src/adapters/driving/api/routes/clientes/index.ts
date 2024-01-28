import { Router } from "express"
import clientes from "./clientes"

const router = Router()
router.post('/cliente', clientes.criaCliente)
router.get('/clientes/cpf', clientes.encontraClientePorCPF)

export default router