"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = exports.Produto = void 0;
const assertionConcern_1 = __importDefault(require("../application/asserts/assertionConcern"));
class Produto extends assertionConcern_1.default {
    constructor(partial) {
        super();
        this.categoriaId = 0;
        this.nome = '';
        this.valor = 0;
        Object.assign(this, partial);
        this.validaEntidade();
    }
    validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'categoriaId':
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto não possui um formato válido.');
                    this.SelfAssertArgumentNotNull(value, 'O produto não possui um formato válido.');
                    break;
                case 'nome':
                    this.SelfAssertArgumentNotNull(value, 'O produto não possui um formato válido.');
                    this.SelfAssertArgumentNotEmpty(value, 'O produto não possui um formato válido.');
                    break;
                case 'valor':
                    this.SelfAssertArgumentNotNull(value, 'O produto não possui um formato válido.');
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto não possui um formato válido.');
                    break;
            }
        });
    }
}
exports.Produto = Produto;
class Categoria extends assertionConcern_1.default {
    constructor(partial) {
        super();
        this.nome = '';
        Object.assign(this, partial);
        this.validaEntidade();
    }
    validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'nome':
                    this.SelfAssertArgumentNotNull(value, 'A categoria não possui um formato válido.');
                    this.SelfAssertArgumentNotEmpty(value, 'A categoria não possui um formato válido.');
                    break;
            }
        });
    }
}
exports.Categoria = Categoria;
