import conexao from "../conexao";
import { Pedido } from "../../../../core/domain/pedido";
import PedidoRepository from "../../../../core/application/ports/pedidoRepository";

export default class MariaDBPedidoRepository implements PedidoRepository {

    async pagaPedido(valor: number): Promise<boolean> {
        const pedidoPago = true
        if ( ! pedidoPago ) {
            throw new Error('Pagamento não autorizado.')
        }

        return true
    }

    async criaPedido(pedido: Pedido): Promise<number> {
        const con = await conexao()
        return await con.query(
            `INSERT INTO pedidos (clientId, status, produtos, data, observacao) 
            VALUES ('${pedido.clienteId}', '${pedido.status}', '${pedido.produtos}', '${pedido.data}', '${pedido.observacao}')`,
            (err: Error, rows: Pedido[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
    }

    async listaPedidos(): Promise<Pedido[]> {
        const con = await conexao()
        return await con.query(
            `SELECT * FROM pedidos`,
            (err: Error, rows: Pedido[]) => {
                if ( err ) return err;
                return rows
            })
    }

}