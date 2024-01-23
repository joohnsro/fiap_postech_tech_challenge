import { Router } from "express"
import clientes from "./clientes"

const router = Router()
router.get('/clientes', clientes.encontraClientePorCPF)
router.post('/clientes', clientes.criaCliente)

export default router