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
const mariaDBPedidoRepository_1 = __importDefault(require("../../../../driven/mariadb/ports/mariaDBPedidoRepository"));
const pedidoService_1 = __importDefault(require("../../../../../core/application/services/pedidoService"));
const repository = new mariaDBPedidoRepository_1.default();
const service = new pedidoService_1.default(repository);
exports.default = {
    listaPedidos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield service.listaPedidos()
            .then(pedidos => res.send(pedidos))
            .catch(error => res.send({ error: error.message }));
    }),
    checkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pedido, produtos } = req.body;
        const pedidoPago = true;
        if (!pedidoPago) {
            throw new Error('Pagamento não autorizado.');
        }
        yield service.criaPedido(pedido)
            .then(pedidoId => {
            produtos.forEach((produto) => __awaiter(void 0, void 0, void 0, function* () {
                yield service.criaProdutoPorPedido(Object.assign(Object.assign({}, produto), { pedidoId }));
            }));
            res.send({ id: pedidoId });
        })
            .catch(error => res.send({ error: error.message }));
    })
};
