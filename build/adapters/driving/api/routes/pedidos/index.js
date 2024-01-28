"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidos_1 = __importDefault(require("./pedidos"));
const router = (0, express_1.Router)();
router.post('/checkout', pedidos_1.default.checkout);
router.get('/pedidos', pedidos_1.default.listaPedidos);
exports.default = router;
