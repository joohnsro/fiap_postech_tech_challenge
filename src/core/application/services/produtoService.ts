import ProdutoRepository from "../ports/produtoRepository"
import { Produto, ProdutoType } from "../../domain/produto"
import Id from "../../value-objects/id"

export default class ProdutoService {
    constructor(private readonly produtoRepository: ProdutoRepository) {}

    async encontraProdutoPorId(data: number): Promise<ProdutoType> {
        const id = Id.criar(data)
        return await this.produtoRepository.encontraProdutoPorId(id.valor)
            .then(response => {
                if ( ! response || ! response[0] ) {
                    throw new Error('Produto não encontrado')
                }
                return response[0]
            })
    }

    async criaProduto(data: ProdutoType): Promise<number> {
        const produto = new Produto(data)
        return await this.produtoRepository.criaProduto(produto)
    }

    async atualizaProduto(data: ProdutoType): Promise<ProdutoType> {
        const id = Id.criar(data.id ? data.id : 0)
        data.id = id.valor
        const produto = new Produto(data)
        return await this.produtoRepository.atualizaProduto(produto)
    }

    async removeProduto(data: number): Promise<boolean> {
        const id = Id.criar(data)
        return await this.produtoRepository.removeProduto(id.valor)
    }

    async listaProdutosPorCategoriaId(data: number): Promise<ProdutoType[]> {
        const id = Id.criar(data)
        return await this.produtoRepository.listaProdutosPorCategoriaId(id.valor)
    }
}