"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assertionConcern_1 = __importDefault(require("../application/asserts/assertionConcern"));
class Cpf {
    constructor(cpf) {
        this.valor = cpf;
    }
    static criar(cpf) {
        assertionConcern_1.default.AssertArgumentNotEmpty(cpf, "O cpf é obrigatório.");
        const pattern = /(\d{3}\.\d{3}\.\d{3}-\d{2})/g;
        assertionConcern_1.default.AssertArgumentMatches(pattern, cpf, "Cpf inválido.");
        assertionConcern_1.default.AssertArgumentNotEquals(cpf.length, 14, "Cpf inválido.");
        return new Cpf(cpf);
    }
}
exports.default = Cpf;
