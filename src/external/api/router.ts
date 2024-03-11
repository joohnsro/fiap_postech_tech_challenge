import { Router } from "express"
import clientes from "./routes/clientes"
import produtos from "./routes/produtos"
import pedidos from "./routes/pedidos"
import weebhook from "./routes/webhook"

const router = Router()
router.use(clientes)
router.use(produtos)
router.use(pedidos)
router.use(weebhook)

export default router