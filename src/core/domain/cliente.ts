import AssertionConcern from "../application/asserts/assertionConcern"

export interface ClienteType {
    id?: number
    nome: string
    cpf: string
}

export class Cliente extends AssertionConcern implements ClienteType {
    id?: number | undefined
    nome: string = ''
    cpf: string = ''

    constructor(partial: Partial<ClienteType>) {
        super()
        Object.assign(this, partial)
        this.validaEntidade()
    }

    private validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'nome':
                    this.SelfAssertArgumentNotEmpty(value, 'O cliente não possui um formato válido.')
                    break
                case 'cpf':
                    this.SelfAssertArgumentNotEmpty(value, 'O cliente não possui um formato válido.')
                    const pattern = /([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})/g;
                    this.SelfAssertArgumentMatches(pattern, value, 'Cpf inválido.')
                    break
            }
        })
    }

}