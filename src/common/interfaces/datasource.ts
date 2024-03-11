import { AdicionaClienteDTO, ClienteDTO } from "../../common/types/cliente";
import { AdicionaProdutoDTO, ProdutoDTO } from "../../common/types/produto";
import { AdicionaPedidoDTO, PedidoDTO, AdicionaProdutoPorPedidoDTO, StatusPagamento, ProdutoPorPedidoDTO, Status, PagamentoPorPedidoDTO } from "../../common/types/pedido";

export interface ClienteDataSourceInterface {
    criarCliente(cliente: AdicionaClienteDTO): Promise<number>
    encontrarClientePorCPF(cpf: string): Promise<ClienteDTO[]>
}

export interface ProdutoDataSourceInterface {
    criarProduto(adicionaProdutoDTO: AdicionaProdutoDTO): Promise<number>
    encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: number): Promise<ProdutoDTO[]>
    encontrarProdutoPorId(produtoId: number): Promise<ProdutoDTO[]>
    atualizarProduto(produtoDTO: ProdutoDTO): Promise<ProdutoDTO>
    removerProduto(produtoId: number): Promise<boolean>
    listarProdutosPorCategoriaId(categoriaId: number): Promise<ProdutoDTO[]>
}

export interface PedidoDataSourceInterface {
    criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, status: Status): Promise<number>
    criarProdutoPorPedido(pedidoId: number, produtoPorPedidoDTO: AdicionaProdutoPorPedidoDTO): Promise<boolean>
    encontrarPedidoPorId(pedidoId: number): Promise<PedidoDTO>
    encontrarProdutosPorPedidoPorPedidoId(pedidoId: number): Promise<ProdutoPorPedidoDTO[]>
    alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<PedidoDTO>
    listarPedidos(): Promise<PedidoDTO[]>
    consultarStatusDoPagamento(pedidoId: number): Promise<PagamentoPorPedidoDTO>
    alterarStatusDoPagamento(pedidoId: number, status: string): Promise<boolean>
    criarPagamentoPorPedido(pedidoId: number, status: StatusPagamento): Promise<boolean>
}