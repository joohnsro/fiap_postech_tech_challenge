import { Router } from "express"
import produtos from "./produtos"

const router = Router()
router.post('/produto', produtos.criaProduto)
router.get('/produto/:productId', produtos.encontraProdutoPorId)
router.put('/produto/:productId', produtos.atualizaProduto)
router.delete('/produto/:productId', produtos.removeProduto)
router.delete('/produtos/category/:categoryId', produtos.listaProdutosPorCategoriaId)

export default router