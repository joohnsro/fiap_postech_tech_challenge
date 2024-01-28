import conexao from "../conexao";
import { ProdutoType } from "../../../../core/domain/produto";
import ProdutoRepository from "../../../../core/application/ports/produtoRepository";

export default class MariaDBProdutoRepository implements ProdutoRepository {

    async encontraProdutoPorId(produtoId: number): Promise<ProdutoType[]> {
        const con = await conexao()
        return await con.query(
            `SELECT * FROM produtos WHERE id = ${produtoId}`,
            (err: Error, rows: ProdutoType[]) => {
                if ( err ) return err;
                return rows
            })
    }

    async criaProduto(produto: ProdutoType): Promise<number> {
        const con = await conexao()
        return await con.query(
            `INSERT INTO produtos (categoriaId, nome, valor) 
            VALUES ('${produto.categoriaId}', '${produto.nome}', '${produto.valor}')`,
            (err: Error, rows: ProdutoType[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async atualizaProduto(produto: ProdutoType): Promise<ProdutoType> {
        const con = await conexao()
        return await con.query(
            `UPDATE produtos SET categoriaId = '${produto.categoriaId}', nome = '${produto.nome}', valor = '${produto.valor}' WHERE id = ${produto.id}`,
            (err: Error, rows: ProdutoType[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async removeProduto(produtoId: number): Promise<boolean> {
        const con = await conexao()
        return await con.query(
            `DELETE FROM produtos WHERE id = ${produtoId}`,
            (err: Error, rows: ProdutoType[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async listaProdutosPorCategoriaId(categoriaId: number): Promise<ProdutoType[]> {
        const con = await conexao()
        return await con.query(
            `SELECT * FROM produtos WHERE categoriaId = ${categoriaId}`,
            (err: Error, rows: ProdutoType[]) => {
                if ( err ) return err;
                return rows
            })
    }

}