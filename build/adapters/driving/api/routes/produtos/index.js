"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produtos_1 = __importDefault(require("./produtos"));
const router = (0, express_1.Router)();
router.post('/produto', produtos_1.default.criaProduto);
router.get('/produto/:produtoId', produtos_1.default.encontraProdutoPorId);
router.put('/produto/:produtoId', produtos_1.default.atualizaProduto);
router.delete('/produto/:produtoId', produtos_1.default.removeProduto);
router.get('/produtos/categoria', produtos_1.default.listaProdutosPorCategoriaId);
exports.default = router;
