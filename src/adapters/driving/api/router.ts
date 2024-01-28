import { Router } from "express"
import clientes from "./routes/clientes"
import produtos from "./routes/produtos"
import pedidos from "./routes/pedidos"

const router = Router()
router.use(clientes)
router.use(produtos)
router.use(pedidos)

export default router