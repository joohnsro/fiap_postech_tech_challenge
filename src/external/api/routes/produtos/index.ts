import { Router } from "express"
import produtos from "./produtos"

const router = Router()
router.post('/produto', produtos.criarProduto)
router.get('/produto/:produtoId', produtos.encontrarProdutoPorId)
router.put('/produto/:produtoId', produtos.atualizarProduto)
router.delete('/produto/:produtoId', produtos.removerProduto)
router.get('/produtos/categoria', produtos.listarProdutosPorCategoriaId)

export default router