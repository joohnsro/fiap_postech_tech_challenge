import { describe, test, expect } from "@jest/globals"
import { Produto } from "../src/core/domain/produto"
import InMemoryProdutoRepository from "../src/adapters/driven/in-memory/inMemoryProdutoRepository"
import ProdutoService from "../src/core/application/services/produtoService"

describe('Serviços do produto', () => {

    test('Criar produto', async () => {
        const produto: Produto = {
            nome: 'X Bacon',
            valor: 26.90,
            categoriaId: 1
        }

        const repository = new InMemoryProdutoRepository()
        const service = new ProdutoService(repository)

        const produtoId = await service.criaProduto(produto)
        expect(produtoId).toBe(3)
    })

    test('Editar produto', async () => {
        const produto: Produto = {
            id: 2,
            nome: 'Pepsi',
            valor: 7.50,
            categoriaId: 2
        }

        const repository = new InMemoryProdutoRepository()
        const service = new ProdutoService(repository)

        const produtoAtualizado = await service.atualizaProduto(produto)
        expect(JSON.stringify(produtoAtualizado)).toStrictEqual(JSON.stringify(produto))
    })

    test('Remover produto', async () => {
        const produtoId = 2

        const repository = new InMemoryProdutoRepository()
        const service = new ProdutoService(repository)

        const produtoFoiRemovido = await service.removeProduto(produtoId)
        expect(produtoFoiRemovido).toBeTruthy()
    })

    test('Buscar produtos por categoria', async () => {
        const categoriaId = 1
        
        const repository = new InMemoryProdutoRepository()
        const service = new ProdutoService(repository)

        const produtos = await service.listaProdutosPorCategoriaId(categoriaId)
        expect(produtos.length).toBe(1)
    })

})