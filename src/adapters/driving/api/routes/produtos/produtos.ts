import { Request, Response } from "express"
import { ProdutoType } from "../../../../../core/domain/produto"
import MariaDBProdutoRepository from "../../../../driven/mariadb/ports/mariaDBProdutoRepository"
import ProdutoService from "../../../../../core/application/services/produtoService"

const repository = new MariaDBProdutoRepository()
const service = new ProdutoService(repository)

export default {
    criaProduto: async (req: Request, res: Response) => {
        const produto: ProdutoType = {...req.body}
        await service.criaProduto(produto)
            .then(produtoId => res.send({id: produtoId}))
            .catch(error => res.send({error: error.message}))
    },
    atualizaProduto: async (req: Request, res: Response) => {
        const id = req.params.produtoId ? parseInt(req.params.produtoId) : 0
        const produto: ProdutoType = {id, ...req.body}
        await service.atualizaProduto(produto)
            .then(() => res.send(produto))
            .catch(error => res.send({error: error.message}))
    },
    removeProduto: async (req: Request, res: Response) => {
        const produtoId: number = parseInt(req.params.produtoId) ? parseInt(req.params.produtoId) : 0
        await service.removeProduto(produtoId)
            .then(() => res.send(true))
            .catch(error => res.send({error: error.message}))
    },
    encontraProdutoPorId: async (req: Request, res: Response) => {
        const produtoId: number = parseInt(req.params.produtoId) ? parseInt(req.params.produtoId) : 0
        await service.encontraProdutoPorId(produtoId)
            .then(response => res.send(response))
            .catch(error => res.send({error: error.message}))
    },
    listaProdutosPorCategoriaId: async (req: Request, res: Response) => {
        const q: string = req.query.q ? String(req.query.q) : '0'
        const categoriaId: number = req.query.q ? parseInt(q) : 0
        await service.listaProdutosPorCategoriaId(categoriaId)
            .then(produtos => res.send(produtos))
            .catch(error => res.send({error: error.message}))
    }
}