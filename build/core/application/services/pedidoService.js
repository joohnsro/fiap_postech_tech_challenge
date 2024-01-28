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
const pedido_1 = require("../../domain/pedido");
class PedidoService {
    constructor(pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }
    criaPedido(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedido = new pedido_1.Pedido(data);
            return yield this.pedidoRepository.criaPedido(pedido);
        });
    }
    criaProdutoPorPedido(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const produtoPorPedido = new pedido_1.ProdutoPorPedido(data);
            return yield this.pedidoRepository.criaProdutoPorPedido(produtoPorPedido);
        });
    }
    listaPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pedidoRepository.listaPedidos();
        });
    }
}
exports.default = PedidoService;
