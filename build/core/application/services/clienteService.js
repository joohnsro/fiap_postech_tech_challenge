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
const cliente_1 = require("../../domain/cliente");
const cpf_1 = __importDefault(require("../../value-objects/cpf"));
class ClienteService {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    criaCliente(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = new cliente_1.Cliente(data);
            return yield this.clienteRepository.criaCliente(cliente);
        });
    }
    encontraClientePorCPF(cpfString) {
        return __awaiter(this, void 0, void 0, function* () {
            const cpf = cpf_1.default.criar(cpfString);
            return yield this.clienteRepository.encontraClientePorCPF(cpf.valor)
                .then(response => {
                if (!response) {
                    throw new Error(`Cliente não encontrado.`);
                }
                return response;
            });
        });
    }
}
exports.default = ClienteService;
