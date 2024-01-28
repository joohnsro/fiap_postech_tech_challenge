"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_1 = __importDefault(require("./clientes"));
const router = (0, express_1.Router)();
router.post('/cliente', clientes_1.default.criaCliente);
router.get('/clientes/cpf', clientes_1.default.encontraClientePorCPF);
exports.default = router;
