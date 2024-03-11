import { describe, test, expect } from "@jest/globals"
import { AdicionaProdutoDTO, ProdutoDTO } from "../src/common/types/produto"
import InMemoryProduto from "../src/external/in-memory/inMemoryProduto"
import InMemoryProdutoGateway from "../src/operation/gateways/in-memory/InMemoryProdutoGateway"
import ProdutoUseCase from "../src/core/use-cases/produtoUseCase"

describe('Serviços do produto', () => {

    test('Encontra produto por nome e categoriaId', async () => {
        const nome = 'X Bacon'
        const categoriaId = 1

        const dataSource = new InMemoryProduto()
        const gateway = new InMemoryProdutoGateway(dataSource)
        const resposta = await ProdutoUseCase.encontrarProdutoPorNomeECategoriaId(nome, categoriaId, gateway)
        
        expect(resposta).toBeNull()
    })

    test('Cadastrar um produto', async () => {
        const adicionaProdutoDTO: AdicionaProdutoDTO = {
            nome: 'X Bacon',
            valor: 26.90,
            categoriaId: 1
        }

        const dataSource = new InMemoryProduto()
        const gateway = new InMemoryProdutoGateway(dataSource)
        const produto = await ProdutoUseCase.criarProduto(adicionaProdutoDTO, gateway)

        expect(produto.id).toBe(3)
    })

    test('Editar produto', async () => {
        const produtoDTO: ProdutoDTO = {
            id: 2,
            nome: 'Pepsi',
            categoriaId: 2,
            valor: 7.50
        }

        const dataSource = new InMemoryProduto()
        const gateway = new InMemoryProdutoGateway(dataSource)
        const produtoAtualizado = await ProdutoUseCase.atualizarProduto(produtoDTO, gateway)

        expect(JSON.stringify({
            id: produtoAtualizado.id,
            nome: produtoAtualizado.nome,
            categoriaId: produtoAtualizado.categoriaId,
            valor: produtoAtualizado.valor,
        })).toStrictEqual(JSON.stringify(produtoDTO))
    })

    test('Remover produto', async () => {
        const produtoId = 2

        const dataSource = new InMemoryProduto()
        const gateway = new InMemoryProdutoGateway(dataSource)
        const produtoFoiRemovido = await ProdutoUseCase.removerProduto(produtoId, gateway)

        expect(produtoFoiRemovido).toBeTruthy()
    })

    test('Buscar produtos por categoria', async () => {
        const categoriaId = 1
        
        const dataSource = new InMemoryProduto()
        const gateway = new InMemoryProdutoGateway(dataSource)
        const produtos = await ProdutoUseCase.listarProdutosPorCategoriaId(categoriaId, gateway)

        expect(produtos?.length).toBe(1)
    })

})