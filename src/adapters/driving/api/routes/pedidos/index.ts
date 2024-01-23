import { Router } from "express"
import pedidos from "./pedidos"

const router = Router()
router.get('/pedidos', pedidos.listaPedidos)
router.post('/pedidos', pedidos.criaPedido)

export default router