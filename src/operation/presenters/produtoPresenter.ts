import { Produto } from "../../core/entities/produto";

export class ProdutoPresenter {
    static toDTO(produto: Produto) {
        const produtoDTO = {
            id: produto.id,
            nome: produto.nome,
            categoriaId: produto.categoriaId,
            valor: produto.valor
        }

        return {
            id: produtoDTO.id,
            nome: produtoDTO.nome,
            categoriaId: produtoDTO.categoriaId,
            valor: produtoDTO.valor
        }
    }

    static toDTOList(produtos: Produto[]) {
        const produtosDTO = produtos.map(produto => ({
            id: produto.id,
            nome: produto.nome,
            categoriaId: produto.categoriaId,
            valor: produto.valor
        }))

        return produtosDTO.map(produto => ({
            id: produto.id,
            nome: produto.nome,
            categoriaId: produto.categoriaId,
            valor: produto.valor
        }))
    }
}