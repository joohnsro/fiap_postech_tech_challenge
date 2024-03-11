import AssertionConcern from "../../common/asserts/assertionConcern"
import { AdicionaProdutoDTO, ProdutoDTO } from "../../common/types/produto"

export class Produto {

    private _id: number
    private _nome: string
    private _categoriaId: number
    private _valor: number

    constructor(produto: ProdutoDTO) {
        Produto.validaDadosDeEntrada(produto)

        if ( ! produto.id ) {
            throw new Error('O produto não possui um formato válido.')
        }

        this._id = produto.id
        this._nome = produto.nome
        this._categoriaId = produto.categoriaId
        this._valor = produto.valor
    }

    get id() : number {
        return this._id
    }

    get nome() : string {
        return this._nome
    }

    get categoriaId() : number {
        return this._categoriaId
    }

    get valor() : number {
        return this._valor
    }

    public static validaDadosDeEntrada(produto: AdicionaProdutoDTO | ProdutoDTO) {
        const propriedades = [ 'nome', 'categoriaId', 'valor' ]
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'categoriaId':
                    AssertionConcern.AssertArgumentNotBiggerThanZero(produto[prop], 'O produto não possui um formato válido.')
                    AssertionConcern.AssertArgumentNotNull(produto[prop], 'O produto não possui um formato válido.')
                    break
                case 'nome':
                    AssertionConcern.AssertArgumentNotNull(produto[prop], 'O produto não possui um formato válido.')
                    AssertionConcern.AssertArgumentNotEmpty(produto[prop], 'O produto não possui um formato válido.')
                    break
                case 'valor':
                    AssertionConcern.AssertArgumentNotNull(produto[prop], 'O produto não possui um formato válido.')
                    AssertionConcern.AssertArgumentNotBiggerThanZero(produto[prop], 'O produto não possui um formato válido.')
                    break
            }
        })
    }

}