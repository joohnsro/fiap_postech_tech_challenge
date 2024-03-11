import conexao from "./conexao";
import { PedidoDTO, AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, StatusPagamento, PagamentoPorPedidoDTO, ProdutoPorPedidoDTO, Status } from "../../common/types/pedido";
import { PedidoDataSourceInterface } from "../../common/interfaces/datasource";

export default class MariaDBPedido implements PedidoDataSourceInterface {

    async criarPedido(pedido: AdicionaPedidoDTO, status: Status): Promise<number> {
        const con = await conexao()
        const { clienteId, observacao, valor } = pedido
        return await con.query(
            `INSERT INTO pedidos (clienteId, status, observacao, valor) 
            VALUES ('${clienteId}', '${status}', '${observacao}', ${valor})`,
            (err: Error, rows: PedidoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async (id: any) => {
                await con.end()
                return id.insertId
            })
    }

    async criarProdutoPorPedido(pedidoId: number, produto: AdicionaProdutoPorPedidoDTO): Promise<boolean> {
        const con = await conexao()
        const { produtoId, quantidade } = produto
        return await con.query(
            `INSERT INTO produtos_por_pedido (pedidoId, produtoId, quantidade) 
            VALUES (${pedidoId}, ${produtoId}, ${quantidade})`,
            (err: Error, rows: PedidoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async () => {
                await con.end()
                return true
            })
            .catch(async () => {
                await con.end()
                return false
            })
    }

    async encontrarPedidoPorId(pedidoId: number): Promise<PedidoDTO> {
        const con = await conexao()
        return await con.query(
            `SELECT *
            FROM pedidos
            WHERE id = ${pedidoId}`,
            (err: Error, rows: PedidoDTO[]) => {
                if ( err ) return err;
                return rows
            })
                .then(async rows => {
                    await con.end()
                    return rows[0]
                })
    }

    async encontrarProdutosPorPedidoPorPedidoId(pedidoId: number): Promise<ProdutoPorPedidoDTO[]> {
        const con = await conexao()
        return await con.query(
            `SELECT *
            FROM pedidos p
            INNER JOIN produtos_por_pedido ppp
                ON ppp.pedidoId = p.id
            WHERE pedidoId = ${pedidoId}`,
            (err: Error, rows: ProdutoPorPedidoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async rows => {
                await con.end()
                return rows
            })
    }

    async alterarStatusDoPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
        const con = await conexao()
        return await con.query(
            `UPDATE pedidos SET status = ${pedido.status} WHERE id = ${pedido.id}`,
            (err: Error, rows: PedidoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async () => {
                await con.end()
                return pedido
            })
    }

    async listarPedidos(): Promise<PedidoDTO[]> {
        const con = await conexao()
        return await con.query(
            `SELECT p.id, p.clienteId, p.status, p.data, p.observacao, p.valor
            FROM pedidos p
            WHERE p.status > 0 AND p.status < 4
            GROUP BY p.id ORDER BY p.status DESC, p.data ASC`,
            (err: Error, rows: PedidoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async rows => {
                await con.end()
                return rows
            })
    }

    async consultarStatusDoPagamento(pedidoId: number): Promise<PagamentoPorPedidoDTO> {
        const con = await conexao()
        return await con.query(
            `SELECT *
            FROM pagamento_por_pedido
            WHERE pedidoId = ${pedidoId}`,
            (err: Error, rows: PagamentoPorPedidoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async rows => {
                await con.end()
                return rows[0]
            })
    }

    async alterarStatusDoPagamento(pedidoId: number, status: string): Promise<boolean> {
        const con = await conexao()
        return await con.query(
            `UPDATE pagamento_por_pedido SET status = '${status}' WHERE pedidoId = ${pedidoId}`,
            (err: Error, rows: PagamentoPorPedidoDTO[]) => {
                if ( err ) return err;
                return rows
            })
            .then(async () => {
                await con.end()
                return true
            })
    }

    async criarPagamentoPorPedido(pedidoId: number, status: StatusPagamento): Promise<boolean> {
        const con = await conexao()
        return await con.query(
            `INSERT INTO pagamento_por_pedido (pedidoId, status) 
            VALUES (${pedidoId}, '${status}')`,
            (err: Error, rows: PagamentoPorPedidoDTO) => {
                if ( err ) return err;
                return rows
            })
            .then(async () => {
                await con.end()
                return true
            })
            .catch(async () => {
                await con.end()
                return false
            })
    }

}