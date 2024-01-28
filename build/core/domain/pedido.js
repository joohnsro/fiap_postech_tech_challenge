"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoPorPedido = exports.Pedido = exports.Status = void 0;
const assertionConcern_1 = __importDefault(require("../application/asserts/assertionConcern"));
var Status;
(function (Status) {
    Status["Invalido"] = "invalido";
    Status["Recebido"] = "recebido";
    Status["EmPreparacao"] = "em-preparacao";
    Status["Pronto"] = "pronto";
    Status["Finalizado"] = "finalizado";
})(Status || (exports.Status = Status = {}));
class Pedido extends assertionConcern_1.default {
    constructor(partial) {
        super();
        this.clienteId = 0;
        this.status = Status.Invalido;
        this.data = '';
        this.observacao = '';
        this.valor = 0;
        Object.assign(this, partial);
        this.validaEntidade();
    }
    validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'clienteId':
                    this.SelfAssertArgumentNotNull(value, 'O pedido não possui um formato válido.');
                    break;
                case 'status':
                    this.SelfAssertArgumentNotNull(value, 'O pedido não possui um formato válido.');
                    this.SelfAssertArgumentNotEmpty(value, 'O pedido não possui um formato válido.');
                    this.SelfAssertArgumentEquals(value, Status.Invalido, 'O pedido não possui um formato válido.');
                    break;
                case 'valor':
                    this.SelfAssertArgumentNotNull(value, 'O pedido não possui um formato válido.');
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O pedido não possui um formato válido.');
                    break;
            }
        });
    }
}
exports.Pedido = Pedido;
class ProdutoPorPedido extends assertionConcern_1.default {
    constructor(partial) {
        super();
        this.pedidoId = 0;
        this.produtoId = 0;
        this.quantidade = 0;
        Object.assign(this, partial);
        this.validaEntidade();
    }
    validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'pedidoId':
                    this.SelfAssertArgumentNotNull(value, 'O produto por pedido não possui um formato válido.');
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto por pedido não possui um formato válido.');
                    break;
                case 'produtoId':
                    this.SelfAssertArgumentNotNull(value, 'O produto por pedido não possui um formato válido.');
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto por pedido não possui um formato válido.');
                    break;
                case 'quantidade':
                    this.SelfAssertArgumentNotNull(value, 'O produto por pedido não possui um formato válido.');
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto por pedido não possui um formato válido.');
                    break;
            }
        });
    }
}
exports.ProdutoPorPedido = ProdutoPorPedido;
