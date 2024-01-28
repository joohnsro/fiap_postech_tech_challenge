"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assertionConcern_1 = __importDefault(require("../application/asserts/assertionConcern"));
class Valor {
    constructor(valor) {
        this.valor = valor;
    }
    static criar(valor) {
        assertionConcern_1.default.AssertArgumentNotNull(valor, "O campo indexador possui um formato inválido.");
        assertionConcern_1.default.AssertArgumentNotNumber(valor, "O campo indexador possui um formato inválido.");
        assertionConcern_1.default.AssertArgumentNotBiggerThanZero(valor, "O campo indexador possui um formato inválido.");
        return new Valor(valor);
    }
}
exports.default = Valor;
