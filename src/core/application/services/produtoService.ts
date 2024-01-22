import ProdutoRepository from "../ports/produtoRepository"
import { Produto, ProdutosPorPedido } from "../../domain/produto"

export default class ProdutoService {
    constructor(private readonly produtoRepository: ProdutoRepository) {}

    async calculaValorTotalDosProdutos(listaProdutos: ProdutosPorPedido[]): Promise<number> {
        return await this.produtoRepository.calculaValorTotalDosProdutos(listaProdutos)
    }

    async encontraProdutoPorId(produtoId: number): Promise<Produto> {
        return await this.produtoRepository.encontraProdutoPorId(produtoId)
    }

    async criaProduto(produto: Produto): Promise<number> {
        return await this.produtoRepository.criaProduto(produto)
    }

    async atualizaProduto(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.atualizaProduto(produto)
    }

    async removeProduto(produtoId: number): Promise<boolean> {
        return await this.produtoRepository.removeProduto(produtoId)
    }

    async listaProdutosPorCategoriaId(categoriaId: number): Promise<Produto[]> {
        return await this.produtoRepository.listaProdutosPorCategoriaId(categoriaId)
    }
}