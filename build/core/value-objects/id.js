"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assertionConcern_1 = __importDefault(require("../application/asserts/assertionConcern"));
class Id {
    constructor(id) {
        this.valor = id;
    }
    static criar(id) {
        assertionConcern_1.default.AssertArgumentNotNull(id, "O campo indexador possui um formato inválido.");
        assertionConcern_1.default.AssertArgumentNotNumber(id, "O campo indexador possui um formato inválido.");
        assertionConcern_1.default.AssertArgumentNotBiggerThanZero(id, "O campo indexador possui um formato inválido.");
        return new Id(id);
    }
}
exports.default = Id;
