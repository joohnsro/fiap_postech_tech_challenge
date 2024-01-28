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
const mariaDBProdutoRepository_1 = __importDefault(require("../../../../driven/mariadb/ports/mariaDBProdutoRepository"));
const produtoService_1 = __importDefault(require("../../../../../core/application/services/produtoService"));
const repository = new mariaDBProdutoRepository_1.default();
const service = new produtoService_1.default(repository);
exports.default = {
    criaProduto: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const produto = Object.assign({}, req.body);
        yield service.criaProduto(produto)
            .then(produtoId => res.send({ id: produtoId }))
            .catch(error => res.send({ error: error.message }));
    }),
    atualizaProduto: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.produtoId ? parseInt(req.params.produtoId) : 0;
        const produto = Object.assign({ id }, req.body);
        yield service.atualizaProduto(produto)
            .then(() => res.send(produto))
            .catch(error => res.send({ error: error.message }));
    }),
    removeProduto: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const produtoId = parseInt(req.params.produtoId) ? parseInt(req.params.produtoId) : 0;
        yield service.removeProduto(produtoId)
            .then(() => res.send(true))
            .catch(error => res.send({ error: error.message }));
    }),
    encontraProdutoPorId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const produtoId = parseInt(req.params.produtoId) ? parseInt(req.params.produtoId) : 0;
        yield service.encontraProdutoPorId(produtoId)
            .then(response => res.send(response))
            .catch(error => res.send({ error: error.message }));
    }),
    listaProdutosPorCategoriaId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const q = req.query.q ? String(req.query.q) : '0';
        const categoriaId = req.query.q ? parseInt(q) : 0;
        yield service.listaProdutosPorCategoriaId(categoriaId)
            .then(produtos => res.send(produtos))
            .catch(error => res.send({ error: error.message }));
    })
};
