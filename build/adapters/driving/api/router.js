"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_1 = __importDefault(require("./routes/clientes"));
const produtos_1 = __importDefault(require("./routes/produtos"));
const pedidos_1 = __importDefault(require("./routes/pedidos"));
const router = (0, express_1.Router)();
router.use(clientes_1.default);
router.use(produtos_1.default);
router.use(pedidos_1.default);
exports.default = router;
