import { Router } from "express"
import clientes from "./routes/clientes"

const router = Router()
router.use(clientes)

export default router