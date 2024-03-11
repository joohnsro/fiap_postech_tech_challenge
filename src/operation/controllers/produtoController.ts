import { ProdutoDataSourceInterface } from "../../common/interfaces/datasource";
import { AdicionaProdutoDTO, ProdutoDTO } from "../../common/types/produto";
import ProdutoUseCase from "../../core/use-cases/produtoUseCase";
import MariaDBProdutoGateway from "../gateways/mariadb/mariaDBProdutoGateway";
import { ProdutoPresenter } from "../presenters/produtoPresenter";

export class ProdutoController {
    static async criarProduto(adicionaProdutoDTO: AdicionaProdutoDTO, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MariaDBProdutoGateway(dataSource)

        try {
            const produtoCadastrado = await ProdutoUseCase.criarProduto(adicionaProdutoDTO, gateway)
            return ProdutoPresenter.toDTO(produtoCadastrado)
        } catch(err) {
            throw new Error("Não foi possível cadastrar o produto.")
        }
    }

    static async encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: number, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MariaDBProdutoGateway(dataSource)
        
        try {
            const produtoEncontrado = await ProdutoUseCase.encontrarProdutoPorNomeECategoriaId(nome, categoriaId, gateway)

            if ( ! produtoEncontrado ) {
                return null
            }

            return ProdutoPresenter.toDTO(produtoEncontrado)
        } catch(err) {
            throw new Error("Não foi possível encontrar o produto.")
        }
    }

    static async encontrarProdutoPorId(produtoId: number, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MariaDBProdutoGateway(dataSource)
        
        try {
            const produtoEncontrado = await ProdutoUseCase.encontrarProdutoPorId(produtoId, gateway)

            if ( ! produtoEncontrado ) {
                return null
            }

            return ProdutoPresenter.toDTO(produtoEncontrado)
        } catch(err) {
            throw new Error("Não foi possível encontrar o produto.")
        }
    }

    static async atualizarProduto(produtoDTO: ProdutoDTO, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MariaDBProdutoGateway(dataSource)

        try {
            const produtoAtualizado = await ProdutoUseCase.atualizarProduto(produtoDTO, gateway)
            return ProdutoPresenter.toDTO(produtoAtualizado)
        } catch(err) {
            throw new Error("Não foi possível atualizar o produto.")
        }
    }

    static async removerProduto(produtoId: number, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MariaDBProdutoGateway(dataSource)

        try {
            return await ProdutoUseCase.removerProduto(produtoId, gateway)
                .then(() => true)
        } catch(err) {
            throw new Error("Não foi possível atualizar o produto.")
        }
    }

    static async listarProdutosPorCategoriaId(categoriaId: number, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MariaDBProdutoGateway(dataSource)

        try {
            const produtosEncontrados = await ProdutoUseCase.listarProdutosPorCategoriaId(categoriaId, gateway)

            if ( ! produtosEncontrados ) {
                return null
            }

            return ProdutoPresenter.toDTOList(produtosEncontrados)
        } catch(err) {
            throw new Error("Não foi possível listar os produtos.")
        }
    }
}