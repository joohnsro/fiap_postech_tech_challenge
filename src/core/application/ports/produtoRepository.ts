import { Produto, ProdutosPorPedido } from "../../domain/produto"

export default interface ProdutoRepository {
    calculaValorTotalDosProdutos(listaProdutos: ProdutosPorPedido[]): Promise<number>
    criaProduto(produto: Produto): Promise<number>
    encontraProdutoPorId(produtoId: number): Promise<Produto>
    atualizaProduto(produto: Produto): Promise<Produto>
    removeProduto(produtoId: number): Promise<boolean>
    listaProdutosPorCategoriaId(categoriaId: number): Promise<Produto[]>
}