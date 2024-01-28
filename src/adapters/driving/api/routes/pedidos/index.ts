import { Router } from "express"
import pedidos from "./pedidos"

const router = Router()
router.post('/checkout', pedidos.checkout)
router.get('/pedidos', pedidos.listaPedidos)

export default router