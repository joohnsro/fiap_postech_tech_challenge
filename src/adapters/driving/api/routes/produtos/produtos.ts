import { Request, Response } from "express"
import { Produto } from "../../../../../core/domain/produto"
import InMemoryProdutoRepository from "../../../../driven/in-memory/inMemoryProdutoRepository"
import ProdutoService from "../../../../../core/application/services/produtoService"

const repository = new InMemoryProdutoRepository()
const service = new ProdutoService(repository)

export default {
    criaProduto: async (req: Request, res: Response) => {
        const produto: Produto = {...req.body}
        await service.criaProduto(produto)
            .then(produtoId => res.send({id: produtoId}))
            .catch(error => res.send({error: error.message}))
    },
    atualizaProduto: async (req: Request, res: Response) => {
        const produto: Produto = {...req.body}
        await service.atualizaProduto(produto)
            .then(produto => res.send(produto))
            .catch(error => res.send({error: error.message}))
    },
    removeProduto: async (req: Request, res: Response) => {
        const produtoId: number = parseInt(req.params.productId) ? parseInt(req.params.productId) : 0
        await service.removeProduto(produtoId)
            .then(response => res.send(response))
            .catch(error => res.send({error: error.message}))
    },
    encontraProdutoPorId: async (req: Request, res: Response) => {
        const produtoId: number = parseInt(req.params.productId) ? parseInt(req.params.productId) : 0
        await service.encontraProdutoPorId(produtoId)
            .then(produto => res.send(produto))
            .catch(error => res.send({error: error.message}))
    },
    listaProdutosPorCategoriaId: async (req: Request, res: Response) => {
        const categoriaId: number = parseInt(req.params.categoriaId) ? parseInt(req.params.categoriaId) : 0
        await service.listaProdutosPorCategoriaId(categoriaId)
            .then(produtos => res.send(produtos))
            .catch(error => res.send({error: error.message}))
    }
}