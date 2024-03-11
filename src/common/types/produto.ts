export type AdicionaProdutoDTO = {
    categoriaId: number
    nome: string
    valor: number
}

export type ProdutoDTO = {
    id: number
    categoriaId: number
    nome: string
    valor: number
}

export type CategoriaDTO = {
    id: number
    nome: string
}