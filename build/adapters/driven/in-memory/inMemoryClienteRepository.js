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
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryClienteRepository {
    constructor() {
        this.clientes = [
            { id: 1, nome: 'Fulano', cpf: '111.222.333-44' },
            { id: 2, nome: 'Ciclano', cpf: '555.666.777-88' },
        ];
    }
    criaCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempClientes = [...this.clientes];
            if (tempClientes.length > 1) {
                tempClientes.sort((a, b) => {
                    if (a.id && b.id) {
                        return a.id - b.id;
                    }
                    else {
                        return false;
                    }
                });
                tempClientes.reverse();
            }
            let ultimoId = tempClientes[0] ? tempClientes[0].id : 0;
            let clienteId = ultimoId ? ultimoId + 1 : 1;
            cliente.id = clienteId;
            this.clientes.push(cliente);
            return clienteId;
        });
    }
    encontraClientePorCPF(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cpf) {
                throw new Error('CPF inválido.');
            }
            const busca = this.clientes.filter(cliente => cliente.cpf === cpf);
            if (busca.length === 0) {
                throw new Error('Cliente não encontrado.');
            }
            return busca[0];
        });
    }
}
exports.default = InMemoryClienteRepository;
