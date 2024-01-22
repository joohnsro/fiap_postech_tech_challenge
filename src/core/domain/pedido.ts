import { ProdutosPorPedido } from "./produto"

export enum Status {
    Recebido = 'recebido',
    EmPreparacao = 'em-preparacao',
    Pronto = 'pronto',
    Finalizado = 'finalizado'
}

export interface Pedido {
    id?: number
    clienteId: number
    status: Status
    produtos: ProdutosPorPedido[]
    data: number
    observacao?: string,
}