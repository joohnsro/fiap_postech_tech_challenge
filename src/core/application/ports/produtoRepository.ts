import { ProdutoType } from "../../domain/produto"

export default interface ProdutoRepository {
    criaProduto(produto: ProdutoType): Promise<number>
    encontraProdutoPorId(produtoId: number): Promise<ProdutoType[]>
    atualizaProduto(produto: ProdutoType): Promise<ProdutoType>
    removeProduto(produtoId: number): Promise<boolean>
    listaProdutosPorCategoriaId(categoriaId: number): Promise<ProdutoType[]>
}