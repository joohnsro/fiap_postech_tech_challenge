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
Object.defineProperty(exports, "__esModule", { value: true });
const pedido_1 = require("../../../core/domain/pedido");
class InMemoryPedidoRepository {
    constructor() {
        this.pedidos = [
            { id: 1, clienteId: 1, data: '2023-12-28 19:00:00', status: pedido_1.Status.Pronto, valor: 60.8 },
            { id: 2, clienteId: 2, data: '2023-12-28 19:40:00', status: pedido_1.Status.EmPreparacao, valor: 30.4 },
        ];
        this.produtosPorPedido = [
            { id: 1, pedidoId: 1, produtoId: 1, quantidade: 2 },
            { id: 2, pedidoId: 1, produtoId: 2, quantidade: 2 },
            { id: 3, pedidoId: 2, produtoId: 1, quantidade: 1 }
        ];
    }
    criaPedido(pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempPedidos = [...this.pedidos];
            if (tempPedidos.length > 1) {
                tempPedidos.sort((a, b) => {
                    if (a.id && b.id) {
                        return a.id - b.id;
                    }
                    else {
                        return false;
                    }
                });
                tempPedidos.reverse();
            }
            let ultimoId = tempPedidos[0] ? tempPedidos[0].id : 0;
            let pedidoId = ultimoId ? ultimoId + 1 : 1;
            pedido.id = pedidoId;
            this.pedidos.push(pedido);
            return pedidoId;
        });
    }
    criaProdutoPorPedido(produtoPorPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempPedidos = [...this.pedidos];
            if (tempPedidos.length > 1) {
                tempPedidos.sort((a, b) => {
                    if (a.id && b.id) {
                        return a.id - b.id;
                    }
                    else {
                        return false;
                    }
                });
                tempPedidos.reverse();
            }
            let ultimoId = tempPedidos[0] ? tempPedidos[0].id : 0;
            let produtoPorPedidoId = ultimoId ? ultimoId + 1 : 1;
            const { pedidoId, produtoId, quantidade } = produtoPorPedido;
            this.produtosPorPedido.push({ id: produtoPorPedidoId, pedidoId, produtoId, quantidade });
            return produtoPorPedidoId;
        });
    }
    listaPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidos;
        });
    }
}
exports.default = InMemoryPedidoRepository;
