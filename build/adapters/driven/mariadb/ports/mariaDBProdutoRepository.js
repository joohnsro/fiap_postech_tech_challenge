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
class MariaDBProdutoRepository {
    encontraProdutoPorId(produtoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield (0, conexao_1.default)();
            return yield con.query(`SELECT * FROM produtos WHERE id = ${produtoId}`, (err, rows) => {
                if (err)
                    return err;
                return rows;
            });
        });
    }
    criaProduto(produto) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield (0, conexao_1.default)();
            return yield con.query(`INSERT INTO produtos (categoriaId, nome, valor) 
            VALUES ('${produto.categoriaId}', '${produto.nome}', '${produto.valor}')`, (err, rows) => {
                if (err)
                    return err;
                return rows;
            })
                .then((id) => id.insertId);
        });
    }
    atualizaProduto(produto) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield (0, conexao_1.default)();
            return yield con.query(`UPDATE produtos SET categoriaId = '${produto.categoriaId}', nome = '${produto.nome}', valor = '${produto.valor}' WHERE id = ${produto.id}`, (err, rows) => {
                if (err)
                    return err;
                return rows;
            })
                .then((id) => id.insertId);
        });
    }
    removeProduto(produtoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield (0, conexao_1.default)();
            return yield con.query(`DELETE FROM produtos WHERE id = ${produtoId}`, (err, rows) => {
                if (err)
                    return err;
                return rows;
            })
                .then((id) => id.insertId);
        });
    }
    listaProdutosPorCategoriaId(categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield (0, conexao_1.default)();
            return yield con.query(`SELECT * FROM produtos WHERE categoriaId = ${categoriaId}`, (err, rows) => {
                if (err)
                    return err;
                return rows;
            });
        });
    }
}
exports.default = MariaDBProdutoRepository;
