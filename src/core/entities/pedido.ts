import AssertionConcern from "../../common/asserts/assertionConcern"
import { AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, PedidoDTO, ProdutoPorPedidoDTO, PagamentoPorPedidoDTO } from "../../common/types/pedido"

export class Pedido {

    private _id: number
    private _clienteId: number
    private _data: string
    private _status: number
    private _valor: number
    private _observacao?: string

    constructor(pedido: PedidoDTO) {
        Pedido.validaDadosDeEntrada(pedido)

        if ( ! pedido.id ) {
            throw new Error('O pedido não possui um formato válido.')
        }

        this._id = pedido.id
        this._clienteId = pedido.clienteId
        this._data = pedido.data
        this._status = pedido.status
        this._valor = pedido.valor
        this._observacao = pedido.observacao
    }

    get id() : number {
        return this._id
    }

    get clienteId() : number {
        return this._clienteId
    }

    get data() : string {
        return this._data
    }

    get status() : number {
        return this._status
    }

    get valor() : number {
        return this._valor
    }

    get observacao() : string | undefined {
        return this._observacao
    }

    public static validaDadosDeEntrada(pedido: AdicionaPedidoDTO | PedidoDTO) {
        const propriedades = [ 'clienteId', 'data', 'status', 'valor', 'produtos' ]
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'clienteId':
                    AssertionConcern.AssertArgumentNotBiggerThanZero(pedido[prop], 'O pedido não possui um formato válido.')
                    break
                case 'data':
                    AssertionConcern.AssertArgumentNotValidDate(pedido[prop], 'O pedido não possui um formato válido.')
                    break
                case 'valor':
                    AssertionConcern.AssertArgumentNotBiggerThanZero(pedido[prop], 'O pedido não possui um formato válido.')
                    break
            }
        })
    }
}

export class ProdutoPorPedido {

    private _pedidoId: number
    private _produtoId: number
    private _quantidade: number

    constructor(produtoPorPedido: ProdutoPorPedidoDTO) {
        ProdutoPorPedido.validaDadosDeEntrada(produtoPorPedido)

        if ( ! produtoPorPedido.pedidoId ) {
            throw new Error('O produto do pedido não possui um formato válido.')
        }

        this._pedidoId = produtoPorPedido.pedidoId
        this._produtoId = produtoPorPedido.produtoId
        this._quantidade = produtoPorPedido.quantidade
    }

    get pedidoId() {
        return this._pedidoId
    }

    get produtoId() {
        return this._produtoId
    }

    get quantidade() {
        return this._quantidade
    }

    public static validaDadosDeEntrada(produtoPorPedido: AdicionaProdutoPorPedidoDTO | ProdutoPorPedidoDTO) {
        const propriedades = [ 'produtoId', 'quantidade' ]
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'produtoId':
                    AssertionConcern.AssertArgumentNotNull(produtoPorPedido[prop], 'O produto do pedido não possui um formato válido.')
                    break
                case 'quantidade':
                    AssertionConcern.AssertArgumentNotBiggerThanZero(produtoPorPedido[prop], 'O produto do pedido não possui um formato válido.')
                    break                 
            }
        })
    }
}

export class PagamentoPorPedido {

    private _pedidoId: number
    private _status: string

    constructor(pagamentoPorPedido: PagamentoPorPedidoDTO) {
        PagamentoPorPedido.validaDadosDeEntrada(pagamentoPorPedido)

        this._pedidoId = pagamentoPorPedido.pedidoId
        this._status = pagamentoPorPedido.status
    }

    get pedidoId() {
        return this._pedidoId
    }

    get status() {
        return this._status
    }

    public static validaDadosDeEntrada(pagamentoPorPedido: PagamentoPorPedidoDTO) {
        const propriedades = [ 'pedidoId', 'status' ]
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'pedidoId':
                    AssertionConcern.AssertArgumentNotNull(pagamentoPorPedido[prop], 'O pagamento do pedido não possui um formato válido.')
                    break
                case 'status':
                    AssertionConcern.AssertArgumentNotNull(pagamentoPorPedido[prop], 'O pagamento não possui um formato válido.')
                    AssertionConcern.AssertArgumentNotEmpty(pagamentoPorPedido[prop], 'O pagamento não possui um formato válido.')
                    break                 
            }
        })
    }
}