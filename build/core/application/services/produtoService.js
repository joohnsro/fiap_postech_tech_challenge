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
const produto_1 = require("../../domain/produto");
const id_1 = __importDefault(require("../../value-objects/id"));
class ProdutoService {
    constructor(produtoRepository) {
        this.produtoRepository = produtoRepository;
    }
    encontraProdutoPorId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = id_1.default.criar(data);
            return yield this.produtoRepository.encontraProdutoPorId(id.valor)
                .then(response => {
                if (!response || !response[0]) {
                    throw new Error('Produto não encontrado');
                }
                return response[0];
            });
        });
    }
    criaProduto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const produto = new produto_1.Produto(data);
            return yield this.produtoRepository.criaProduto(produto);
        });
    }
    atualizaProduto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = id_1.default.criar(data.id ? data.id : 0);
            data.id = id.valor;
            const produto = new produto_1.Produto(data);
            return yield this.produtoRepository.atualizaProduto(produto);
        });
    }
    removeProduto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = id_1.default.criar(data);
            return yield this.produtoRepository.removeProduto(id.valor);
        });
    }
    listaProdutosPorCategoriaId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = id_1.default.criar(data);
            return yield this.produtoRepository.listaProdutosPorCategoriaId(id.valor);
        });
    }
}
exports.default = ProdutoService;
