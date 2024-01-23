import conexao from "../conexao";
import { Produto, ProdutosPorPedido } from "../../../../core/domain/produto";
import ProdutoRepository from "../../../../core/application/ports/produtoRepository";

export default class MariaDBProdutoRepository implements ProdutoRepository {

    async encontraProdutoPorId(produtoId: number): Promise<Produto> {
        const con = await conexao()
        return await con.query(
            `SELECT * FROM produtos WHERE id = ${produtoId}`,
            (err: Error, rows: Produto[]) => {
                if ( err ) return err;
                return rows[0]
            })
            .then((produto: Produto) => produto)
    }

    async criaProduto(produto: Produto): Promise<number> {
        const con = await conexao()
        return await con.query(
            `INSERT INTO produtos (categoriaId, nome, valor) 
            VALUES ('${produto.categoriaId}', '${produto.nome}', '${produto.valor}')`,
            (err: Error, rows: Produto[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async atualizaProduto(produto: Produto): Promise<Produto> {
        const con = await conexao()
        return await con.query(
            `UPDATE produtos SET categoriaId = '${produto.categoriaId}', nome = '${produto.nome}', valor = '${produto.valor}' WHERE id = ${produto.id}`,
            (err: Error, rows: Produto[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async removeProduto(produtoId: number): Promise<boolean> {
        const con = await conexao()
        return await con.query(
            `DELETE FROM produtos WHERE id = ${produtoId}`,
            (err: Error, rows: Produto[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async listaProdutosPorCategoriaId(categoriaId: number): Promise<Produto[]> {
        const con = await conexao()
        return await con.query(
            `SELECT * FROM produtos WHERE categoriaId = ${categoriaId}`,
            (err: Error, rows: Produto[]) => {
                if ( err ) return err;
                return rows
            })
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