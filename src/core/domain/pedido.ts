import { Produto } from './produto'

export interface Pedido {
    id?: number;
    clienteId: number;
    data: number;
    produtos?: Produto[];
    observacao: string;
}