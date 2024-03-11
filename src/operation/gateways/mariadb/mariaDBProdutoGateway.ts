import { ProdutoGatewayInterface } from "../../../common/interfaces/gateways";
import { ProdutoDataSourceInterface } from "../../../common/interfaces/datasource";
import { AdicionaProdutoDTO, ProdutoDTO } from "../../../common/types/produto";
import { Produto } from "../../../core/entities/produto"

export default class MariaDBProdutoGateway implements ProdutoGatewayInterface {

    private readonly dataSource: ProdutoDataSourceInterface;

    constructor(dataSource: ProdutoDataSourceInterface) {
        this.dataSource = dataSource
    }
    
    async criarProduto(adicionaProdutoDTO: AdicionaProdutoDTO): Promise<Produto> {
        const produtoId = await this.dataSource.criarProduto(adicionaProdutoDTO)
        return new Produto({
            id: produtoId,
            ...adicionaProdutoDTO
        })
    }

    async encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: number): Promise<Produto | null> {
        const produtosDataSource = await this.dataSource.encontrarProdutoPorNomeECategoriaId(
            nome, categoriaId
        )

        if ( produtosDataSource === null || produtosDataSource === undefined || produtosDataSource.length < 1 ) {
            return null
        }

        return new Produto(produtosDataSource[0])
    }

    async encontrarProdutoPorId(produtoId: number): Promise<Produto | null> {
        const produtosDataSource = await this.dataSource.encontrarProdutoPorId(produtoId)

        if ( ! produtosDataSource || produtosDataSource === null || produtosDataSource === undefined || produtosDataSource.length < 1 ) {
            return null
        }

        return new Produto(produtosDataSource[0])
    }

    async atualizarProduto(produtoDTO: ProdutoDTO): Promise<Produto> {
        const resposta = await this.dataSource.atualizarProduto(produtoDTO)
        return new Produto(resposta)
    }

    async removerProduto(produtoId: number): Promise<boolean> {
        return this.dataSource.removerProduto(produtoId)    
    }

    async listarProdutosPorCategoriaId(categoriaId: number): Promise<Produto[] | null> {
        const produtosDataSource = await this.dataSource.listarProdutosPorCategoriaId(categoriaId)
        
        if ( ! produtosDataSource || produtosDataSource === null || produtosDataSource === undefined || produtosDataSource.length < 1 ) {
            return null;
        }

        return produtosDataSource.map(produtoDTO => {
            return new Produto(produtoDTO)
        })
    }
}