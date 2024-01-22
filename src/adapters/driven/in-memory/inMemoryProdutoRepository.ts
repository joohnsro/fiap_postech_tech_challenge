import ProdutoRepository from "../../../core/application/ports/produtoRepository"
import { Produto, Categoria, ProdutosPorPedido } from "../../../core/domain/produto"

export default class InMemoryClienteRepository implements ProdutoRepository {
    
    private produtos: Produto[] = [
        { id: 1, nome: 'X Salada', valor: 22.90, categoriaId: 1 },
        { id: 2, nome: 'Coca-cola', valor: 7.5, categoriaId: 2 }
    ]

    private categorias: Categoria[] = [
        { id: 1, nome: 'Lanches' },
        { id: 2, nome: 'Bebidas' },
        { id: 3, nome: 'Acompanhamentos' },
        { id: 4, nome: 'Sobremesas' }
    ]

    async encontraProdutoPorId(produtoId: number): Promise<Produto> {
        const posicaoProduto = this.produtos.map(item => item.id).indexOf(produtoId)

        if ( posicaoProduto === -1 ) {
            throw new Error('Produto não encontrado')
        }

        return await Promise.resolve(this.produtos[posicaoProduto])
    }

    async criaProduto(produto: Produto): Promise<number> {
        const tempProdutos: Produto[] = [...this.produtos]
        if ( tempProdutos.length > 1 ) {
            tempProdutos.sort((a: Produto, b: Produto): any => {
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

        produto.id = produtoId
        this.produtos.push(produto)
        
        return produtoId
    }

    async atualizaProduto(produto: Produto): Promise<Produto> {
        const buscaProdutoPorId = this.produtos.filter(item => item.id === produto.id)
        if ( ! buscaProdutoPorId[0] ) {
            throw new Error('Produto não encontrado')
        }

        this.produtos.forEach(item => {
            if ( item.id === produto.id ) {
                item.nome = produto.nome
                item.categoriaId = produto.categoriaId
            }
        })

        return this.produtos.filter(item => item.id === produto.id)[0]
    }

    async removeProduto(produtoId: number): Promise<boolean> {
        const buscaProdutoPorId = this.produtos.filter(item => item.id === produtoId)
        if ( ! buscaProdutoPorId[0] ) {
            throw new Error('Produto não encontrado')
        }

        const posicaoProduto = this.produtos.map(item => item.id).indexOf(produtoId)
        this.produtos.splice(posicaoProduto, 1)

        return true
    }

    async listaProdutosPorCategoriaId(categoriaId:number): Promise<Produto[]> {
        return this.produtos.filter(item => item.categoriaId === categoriaId)
    }

    async calculaValorTotalDosProdutos(listaProdutos: ProdutosPorPedido[]): Promise<number> {
        let valorTotal: number[] = await Promise.all(listaProdutos.map(async item => {
            return await this.encontraProdutoPorId(item.produtoId)
                .then((produto: Produto) => {
                    return produto.valor * item.quantidade
                })
        }))

        return valorTotal.reduce((a, b) => a + b)
    }
}