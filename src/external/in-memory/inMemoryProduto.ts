import { ProdutoDTO, AdicionaProdutoDTO } from "../../common/types/produto"
import { ProdutoDataSourceInterface } from "../../common/interfaces/datasource"

export default class InMemoryProduto implements ProdutoDataSourceInterface {
    
    private produtos: ProdutoDTO[] = [
        { id: 1, nome: 'X Salada', valor: 22.90, categoriaId: 1 },
        { id: 2, nome: 'Coca-cola', valor: 7.5, categoriaId: 2 }
    ]

    // private categorias: any[] = [
    //     { id: 1, nome: 'Lanches' },
    //     { id: 2, nome: 'Bebidas' },
    //     { id: 3, nome: 'Acompanhamentos' },
    //     { id: 4, nome: 'Sobremesas' }
    // ]

    async encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: number): Promise<ProdutoDTO[]> {
        return this.produtos.filter(produto => produto.nome === nome && produto.categoriaId === categoriaId)
    }

    async criarProduto(adcionaProdutoDTO: AdicionaProdutoDTO): Promise<number> {
        const tempProdutos: ProdutoDTO[] = [...this.produtos]
        if ( tempProdutos.length > 1 ) {
            tempProdutos.sort((a: ProdutoDTO, b: ProdutoDTO): any => {
                if ( a.id && b.id ) {
                    return a.id - b.id
                } else {
                    return false
                }
            })
            tempProdutos.reverse()
        }

        let ultimoId: number|undefined = tempProdutos[0] ? tempProdutos[0].id : 0
        let produtoId = ultimoId ? ultimoId + 1 : 1

        const produto = {id: produtoId, ...adcionaProdutoDTO}
        this.produtos.push(produto)
        
        return produtoId
    }

    async encontrarProdutoPorId(produtoId: number): Promise<ProdutoDTO[]> {
        return this.produtos.filter(produto => produto.id === produtoId)
    }

    async atualizarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
        this.produtos.forEach(item => {
            if ( item.id === produto.id ) {
                item.nome = produto.nome
                item.categoriaId = produto.categoriaId
            }
        })

        return this.produtos.filter(item => item.id === produto.id)[0]
    }

    async removerProduto(produtoId: number): Promise<boolean> {
        const posicaoProduto = this.produtos.map(item => item.id).indexOf(produtoId)
        this.produtos.splice(posicaoProduto, 1)

        return true
    }

    async listarProdutosPorCategoriaId(categoriaId: number): Promise<ProdutoDTO[]> {
        return this.produtos.filter(item => item.categoriaId === categoriaId)
    }

}