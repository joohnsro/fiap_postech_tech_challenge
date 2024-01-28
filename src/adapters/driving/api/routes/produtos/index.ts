import { Router } from "express"
import produtos from "./produtos"

const router = Router()
router.post('/produto', produtos.criaProduto)
router.get('/produto/:produtoId', produtos.encontraProdutoPorId)
router.put('/produto/:produtoId', produtos.atualizaProduto)
router.delete('/produto/:produtoId', produtos.removeProduto)
router.get('/produtos/categoria', produtos.listaProdutosPorCategoriaId)

export default router