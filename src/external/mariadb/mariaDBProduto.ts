import conexao from "./conexao";
import { ProdutoDTO, AdicionaProdutoDTO } from "../../common/types/produto";
import { ProdutoDataSourceInterface } from "../../common/interfaces/datasource";

export default class MariaDBProduto implements ProdutoDataSourceInterface {

    async encontrarProdutoPorId(produtoId: number): Promise<ProdutoDTO[]> {
        const con = await conexao()
        return await con.query(
            `SELECT * FROM produtos WHERE id = ${produtoId}`,
            (err: Error, rows: ProdutoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async rows => {
                await con.end()
                return rows
            })
    }

    async encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: number): Promise<ProdutoDTO[]> {
        const con = await conexao()
        return await con.query(
            `SELECT * FROM produtos WHERE nome = '${nome}' AND categoriaId = '${categoriaId}'`,
            (err: Error, rows: ProdutoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async rows => {
                await con.end()
                return rows
            })
    }

    async criarProduto(produto: AdicionaProdutoDTO): Promise<number> {
        const con = await conexao()
        return await con.query(
            `INSERT INTO produtos (categoriaId, nome, valor) 
            VALUES ('${produto.categoriaId}', '${produto.nome}', '${produto.valor}')`,
            (err: Error, rows: ProdutoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async (id: any) => {
                await con.end()
                return id.insertId
            })
    }

    async atualizarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
        const con = await conexao()
        return await con.query(
            `UPDATE produtos SET categoriaId = '${produto.categoriaId}', nome = '${produto.nome}', valor = '${produto.valor}' WHERE id = ${produto.id}`,
            (err: Error, rows: ProdutoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async () => {
                await con.end()
                return produto
            })
    }

    async removerProduto(produtoId: number): Promise<boolean> {
        const con = await conexao()
        return await con.query(
            `DELETE FROM produtos WHERE id = ${produtoId}`,
            (err: Error, rows: ProdutoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async (id: any) => {
                await con.end()
                return id.insertId
            })
    }

    async listarProdutosPorCategoriaId(categoriaId: number): Promise<ProdutoDTO[]> {
        const con = await conexao()
        return await con.query(
            `SELECT * FROM produtos WHERE categoriaId = ${categoriaId}`,
            (err: Error, rows: ProdutoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async rows => {
                await con.end()
                return rows
            })
    }

}