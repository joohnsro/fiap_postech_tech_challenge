import { Produto } from "../../core/entities/produto";
import { ProdutoGatewayInterface } from "../../common/interfaces/gateways";
import { AdicionaProdutoDTO, ProdutoDTO } from "../../common/types/produto";

export default class ProdutoUseCase {

    static async criarProduto(adicionaProdutoDTO: AdicionaProdutoDTO, gateway: ProdutoGatewayInterface): Promise<Produto> {
        Produto.validaDadosDeEntrada(adicionaProdutoDTO)

        const produto = await ProdutoUseCase.encontrarProdutoPorNomeECategoriaId(adicionaProdutoDTO.nome, adicionaProdutoDTO.categoriaId, gateway)

        if ( produto ) {
            throw new Error('Produto já cadastrado.')
        }

        return await gateway.criarProduto(adicionaProdutoDTO)
    }

    static async encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: number, gateway: ProdutoGatewayInterface): Promise<Produto | null> {
        return await gateway.encontrarProdutoPorNomeECategoriaId(nome, categoriaId)
    }

    static async encontrarProdutoPorId(produtoId: number, gateway: ProdutoGatewayInterface): Promise<Produto> {
        const produto = await gateway.encontrarProdutoPorId(produtoId)

        if ( ! produto ) {
            throw new Error('Produto não encontrado.')
        }

        return produto
    }

    static async atualizarProduto(produtoDTO: ProdutoDTO, gateway: ProdutoGatewayInterface): Promise<Produto> {
        const produto = await ProdutoUseCase.encontrarProdutoPorId(produtoDTO.id, gateway)
        return await gateway.atualizarProduto(produtoDTO)
    }

    static async removerProduto(produtoId: number, gateway: ProdutoGatewayInterface): Promise<boolean> {

        const produto = await ProdutoUseCase.encontrarProdutoPorId(produtoId, gateway)

        if ( ! produto ) {
            throw new Error('Produto não encontrado.')
        }

        return await gateway.removerProduto(produtoId)
    }

    static async listarProdutosPorCategoriaId(categoriaId: number, gateway: ProdutoGatewayInterface): Promise<Produto[] | null> {
        return await gateway.listarProdutosPorCategoriaId(categoriaId)
    }
}