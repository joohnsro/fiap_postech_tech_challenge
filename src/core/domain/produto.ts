export interface Produto {
    id?: number
    categoriaId: number
    nome: string,
    valor: number
}

export interface Categoria {
    id?: number
    nome: string
}

export interface ProdutosPorPedido {
    produtoId: number,
    quantidade: number
}