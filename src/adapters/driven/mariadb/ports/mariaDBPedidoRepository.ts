import conexao from "../conexao";
import { PedidoType, ProdutoPorPedidoType } from "../../../../core/domain/pedido";
import PedidoRepository from "../../../../core/application/ports/pedidoRepository";

export default class MariaDBPedidoRepository implements PedidoRepository {

    async criaPedido(pedido: PedidoType): Promise<number> {
        const con = await conexao()
        const { clienteId, status, observacao, valor } = pedido
        return await con.query(
            `INSERT INTO pedidos (clienteId, status, observacao, valor) 
            VALUES ('${clienteId}', '${status}', '${observacao}', ${valor})`,
            (err: Error, rows: PedidoType[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async criaProdutoPorPedido(produto: ProdutoPorPedidoType): Promise<number> {
        const con = await conexao()
        const { pedidoId, produtoId, quantidade } = produto
        return await con.query(
            `INSERT INTO produtos_por_pedido (pedidoId, produtoId, quantidade) 
            VALUES (${pedidoId}, ${produtoId}, ${quantidade})`,
            (err: Error, rows: PedidoType[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async encontraPedido(pedidoId: number): Promise<PedidoType> {
        const con = await conexao()
        return await con.query(
            `SELECT *
            FROM pedidos
            WHERE pedidoId = ${pedidoId}`,
            (err: Error, rows: PedidoType[]) => {
                if ( err ) return err;
                return rows
            })
    }

    async atualizaPedido(pedido: PedidoType): Promise<PedidoType> {
        const con = await conexao()
        return await con.query(
            `UPDATE pedido SET status = '${pedido.status}', observacao = '${pedido.observacao}', valor = '${pedido.valor}' WHERE id = ${pedido.id}`,
            (err: Error, rows: PedidoType[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async listaPedidos(): Promise<PedidoType[]> {
        const con = await conexao()
        return await con.query(
            `SELECT p.id, c.nome, p.status, p.data, 
            GROUP_CONCAT(CONCAT(ppp.quantidade,'-',prod.nome) SEPARATOR ',') as produtos, p.observacao, p.valor
            FROM pedidos p
            INNER JOIN produtos_por_pedido ppp
                ON ppp.pedidoId = p.id
            INNER JOIN produtos prod
                ON ppp.produtoId = prod.id
            INNER JOIN clientes c
                ON p.clienteId = c.id
            GROUP BY p.id ORDER BY p.data ASC`,
            (err: Error, rows: PedidoType[]) => {
                if ( err ) return err;
                return rows
            })
    }

}