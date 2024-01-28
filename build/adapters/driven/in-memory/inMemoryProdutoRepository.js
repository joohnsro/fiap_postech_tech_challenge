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
        this.produtos = [
            { id: 1, nome: 'X Salada', valor: 22.90, categoriaId: 1 },
            { id: 2, nome: 'Coca-cola', valor: 7.5, categoriaId: 2 }
        ];
        this.categorias = [
            { id: 1, nome: 'Lanches' },
            { id: 2, nome: 'Bebidas' },
            { id: 3, nome: 'Acompanhamentos' },
            { id: 4, nome: 'Sobremesas' }
        ];
    }
    encontraProdutoPorId(produtoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const posicaoProduto = this.produtos.map(item => item.id).indexOf(produtoId);
            if (posicaoProduto === -1) {
                throw new Error('Produto não encontrado');
            }
            return yield Promise.resolve([this.produtos[posicaoProduto]]);
        });
    }
    criaProduto(produto) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempProdutos = [...this.produtos];
            if (tempProdutos.length > 1) {
                tempProdutos.sort((a, b) => {
                    if (a.id && b.id) {
                        return a.id - b.id;
                    }
                    else {
                        return false;
                    }
                });
                tempProdutos.reverse();
            }
            let ultimoId = tempProdutos[0] ? tempProdutos[0].id : 0;
            let produtoId = ultimoId ? ultimoId + 1 : 1;
            produto.id = produtoId;
            this.produtos.push(produto);
            return produtoId;
        });
    }
    atualizaProduto(produto) {
        return __awaiter(this, void 0, void 0, function* () {
            const buscaProdutoPorId = this.produtos.filter(item => item.id === produto.id);
            if (!buscaProdutoPorId[0]) {
                throw new Error('Produto não encontrado');
            }
            this.produtos.forEach(item => {
                if (item.id === produto.id) {
                    item.nome = produto.nome;
                    item.categoriaId = produto.categoriaId;
                }
            });
            return this.produtos.filter(item => item.id === produto.id)[0];
        });
    }
    removeProduto(produtoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const buscaProdutoPorId = this.produtos.filter(item => item.id === produtoId);
            if (!buscaProdutoPorId[0]) {
                throw new Error('Produto não encontrado');
            }
            const posicaoProduto = this.produtos.map(item => item.id).indexOf(produtoId);
            this.produtos.splice(posicaoProduto, 1);
            return true;
        });
    }
    listaProdutosPorCategoriaId(categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.produtos.filter(item => item.categoriaId === categoriaId);
        });
    }
}
exports.default = InMemoryClienteRepository;
