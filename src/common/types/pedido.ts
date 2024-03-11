export enum Status {
    Invalido = 0,
    Recebido = 1,
    EmPreparacao = 2,
    Pronto = 3,
    Finalizado = 4
}

export enum StatusName {
    'invalido',
    'recebido',
    'em-preparacao',
    'pronto',
    'finalizado'
}

export type AdicionaPedidoDTO = {
    clienteId: number
    data: string
    valor: number
    observacao?: string
}

export type PedidoDTO = {
    id: number
    clienteId: number
    data: string
    status: number
    valor: number
    observacao?: string
}

export type PedidoComProdutosDTO = {
    id: number
    clienteId: number
    data: string
    status: number
    valor: number
    observacao?: string,
    produtos: ProdutoPorPedidoDTO[]
}

export type AdicionaProdutoPorPedidoDTO = {
    produtoId: number
    quantidade: number
}

export type ProdutoPorPedidoDTO = {
    pedidoId: number
    produtoId: number
    quantidade: number
}

export type PagamentoPorPedidoDTO = {
    pedidoId: number
    status: StatusPagamento
}

export enum StatusPagamento {
    APRO = 'APRO',
    OTHE = 'OTHE',
    CONT = 'CONT',
    CALL = 'CALL',
    FUND = 'FUND',
    SECU = 'SECU',
    EXPI = 'EXPI',
    FORM = 'FORM'
}