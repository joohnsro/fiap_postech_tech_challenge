"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const assertionConcern_1 = __importDefault(require("../application/asserts/assertionConcern"));
class Cliente extends assertionConcern_1.default {
    constructor(partial) {
        super();
        this.nome = '';
        this.cpf = '';
        Object.assign(this, partial);
        this.validaEntidade();
    }
    validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'nome':
                    this.SelfAssertArgumentNotEmpty(value, 'O cliente não possui um formato válido.');
                    break;
                case 'cpf':
                    this.SelfAssertArgumentNotEmpty(value, 'O cliente não possui um formato válido.');
                    const pattern = /([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})/g;
                    this.SelfAssertArgumentMatches(pattern, value, 'Cpf inválido.');
                    break;
            }
        });
    }
}
exports.Cliente = Cliente;
