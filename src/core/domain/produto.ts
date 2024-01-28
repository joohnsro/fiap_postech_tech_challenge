import AssertionConcern from "../application/asserts/assertionConcern"

export interface ProdutoType {
    id?: number | undefined
    categoriaId: number
    nome: string
    valor: number
}

export interface CategoriaType {
    id?: number | undefined
    nome: string
}

export class Produto extends AssertionConcern implements ProdutoType {
    id: number | undefined
    categoriaId: number = 0
    nome: string = ''
    valor: number = 0

    constructor(partial: ProdutoType) {
        super()
        Object.assign(this, partial)
        this.validaEntidade()
    }

    private validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'categoriaId':
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto não possui um formato válido.')
                    this.SelfAssertArgumentNotNull(value, 'O produto não possui um formato válido.')
                    break
                case 'nome':
                    this.SelfAssertArgumentNotNull(value, 'O produto não possui um formato válido.')
                    this.SelfAssertArgumentNotEmpty(value, 'O produto não possui um formato válido.')
                    break
                case 'valor':
                    this.SelfAssertArgumentNotNull(value, 'O produto não possui um formato válido.')
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto não possui um formato válido.')
                    break
            }
        })
    }
}

export class Categoria extends AssertionConcern implements CategoriaType {
    id?: number | undefined
    nome: string = ''

    constructor(partial: ProdutoType) {
        super()
        Object.assign(this, partial)
        this.validaEntidade()
    }

    private validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'nome':
                    this.SelfAssertArgumentNotNull(value, 'A categoria não possui um formato válido.')
                    this.SelfAssertArgumentNotEmpty(value, 'A categoria não possui um formato válido.')
                    break
            }
        })
    }
}