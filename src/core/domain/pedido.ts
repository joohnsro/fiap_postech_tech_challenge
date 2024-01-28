import AssertionConcern from "../application/asserts/assertionConcern"

export enum Status {
    Invalido = 'invalido',
    Recebido = 'recebido',
    EmPreparacao = 'em-preparacao',
    Pronto = 'pronto',
    Finalizado = 'finalizado'
}

export interface PedidoType {
    id?: number
    clienteId: number
    status: Status
    data: string
    observacao?: string,
    valor: number
}

export interface ProdutoPorPedidoType {
    id?: number,
    pedidoId: number,
    produtoId: number,
    quantidade: number
}

export class Pedido extends AssertionConcern implements PedidoType {
    id?: number | undefined
    clienteId: number = 0
    status: Status = Status.Invalido
    data: string = ''
    observacao?: string | undefined = ''
    valor: number = 0
    

    constructor(partial: Partial<PedidoType>) {
        super()
        Object.assign(this, partial)
        this.validaEntidade()
    }

    private validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'clienteId':
                    this.SelfAssertArgumentNotNull(value, 'O pedido não possui um formato válido.')
                    break
                case 'status':
                    this.SelfAssertArgumentNotNull(value, 'O pedido não possui um formato válido.')
                    this.SelfAssertArgumentNotEmpty(value, 'O pedido não possui um formato válido.')
                    this.SelfAssertArgumentEquals(value, Status.Invalido, 'O pedido não possui um formato válido.')
                    break
                case 'valor':
                    this.SelfAssertArgumentNotNull(value, 'O pedido não possui um formato válido.')
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O pedido não possui um formato válido.')
                    break
            }
        })
    }
}

export class ProdutoPorPedido extends AssertionConcern implements ProdutoPorPedidoType {
    id?: number | undefined
    pedidoId: number = 0
    produtoId: number = 0
    quantidade: number = 0 

    constructor(partial: Partial<ProdutoPorPedidoType>) {
        super()
        Object.assign(this, partial)
        this.validaEntidade()
    }    

    private validaEntidade() {
        Object.entries(this).forEach(([key, value]) => {
            switch (key) {
                case 'pedidoId':
                    this.SelfAssertArgumentNotNull(value, 'O produto por pedido não possui um formato válido.')
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto por pedido não possui um formato válido.')
                    break
                case 'produtoId':
                    this.SelfAssertArgumentNotNull(value, 'O produto por pedido não possui um formato válido.')
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto por pedido não possui um formato válido.')
                    break
                case 'quantidade':
                    this.SelfAssertArgumentNotNull(value, 'O produto por pedido não possui um formato válido.')
                    this.SelfAssertArgumentNotBiggerThanZero(value, 'O produto por pedido não possui um formato válido.')
                    break
            }
        })
    }
}