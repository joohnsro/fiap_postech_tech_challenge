"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexao_1 = __importDefault(require("../conexao"));
class MariaDBPedidoRepository {
    criaPedido(pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield (0, conexao_1.default)();
            const { clienteId, status, observacao, valor } = pedido;
            return yield con.query(`INSERT INTO pedidos (clienteId, status, observacao, valor) 
            VALUES ('${clienteId}', '${status}', '${observacao}', ${valor})`, (err, rows) => {
                if (err)
                    return err;
                return rows;
            })
                .then((id) => id.insertId);
        });
    }
    criaProdutoPorPedido(produto) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield (0, conexao_1.default)();
            const { pedidoId, produtoId, quantidade } = produto;
            return yield con.query(`INSERT INTO produtos_por_pedido (pedidoId, produtoId, quantidade) 
            VALUES (${pedidoId}, ${produtoId}, ${quantidade})`, (err, rows) => {
                if (err)
                    return err;
                return rows;
            })
                .then((id) => id.insertId);
        });
    }
    listaPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield (0, conexao_1.default)();
            return yield con.query(`SELECT p.id, c.nome, p.status, p.data, 
            GROUP_CONCAT(CONCAT(ppp.quantidade,'-',prod.nome) SEPARATOR ',') as produtos, p.observacao, p.valor
            FROM pedidos p
            INNER JOIN produtos_por_pedido ppp
                ON ppp.pedidoId = p.id
            INNER JOIN produtos prod
                ON ppp.produtoId = prod.id
            INNER JOIN clientes c
                ON p.clienteId = c.id
            GROUP BY p.id ORDER BY p.data, p.id DESC`, (err, rows) => {
                if (err)
                    return err;
                return rows;
            });
        });
    }
}
exports.default = MariaDBPedidoRepository;
