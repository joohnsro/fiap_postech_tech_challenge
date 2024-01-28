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
const mariaDBClienteRepository_1 = __importDefault(require("../../../../driven/mariadb/ports/mariaDBClienteRepository"));
const clienteService_1 = __importDefault(require("../../../../../core/application/services/clienteService"));
const repository = new mariaDBClienteRepository_1.default();
const service = new clienteService_1.default(repository);
exports.default = {
    encontraClientePorCPF: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const cpf = req.query.q && req.query.q != '' ? String(req.query.q) : '';
        yield service.encontraClientePorCPF(cpf)
            .then(cliente => res.send(cliente))
            .catch(error => res.send({ error: error.message }));
    }),
    criaCliente: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const cliente = Object.assign({}, req.body);
        yield service.criaCliente(cliente)
            .then(clienteId => res.send({ id: clienteId }))
            .catch(error => res.send({ error: error.message }));
    })
};
