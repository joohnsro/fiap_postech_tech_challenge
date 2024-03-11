import { AdicionaClienteDTO } from "../../common/types/cliente";
import { AdicionaPedidoDTO, AdicionaProdutoPorPedidoDTO, PedidoDTO, Status, StatusPagamento } from "../../common/types/pedido";
import { AdicionaProdutoDTO, ProdutoDTO } from "../../common/types/produto";
import { Produto } from "../../core/entities/produto";
import { PagamentoPorPedido, Pedido, ProdutoPorPedido } from "../../core/entities/pedido";
import { Cliente } from "../../core/entities/cliente";

export interface ClienteGatewayInterface {
    criarCliente(adicionaClienteDTO: AdicionaClienteDTO): Promise<Cliente>
    encontrarClientePorCPF(cpf: string): Promise<Cliente | null>
}

export interface ProdutoGatewayInterface {
    criarProduto(adicionaProdutoDTO: AdicionaProdutoDTO): Promise<Produto>
    atualizarProduto(produtoDTO: ProdutoDTO): Promise<Produto>
    removerProduto(produtoId: number): Promise<boolean>
    encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: number): Promise<Produto | null>
    encontrarProdutoPorId(produtoId: number): Promise<Produto | null>
    listarProdutosPorCategoriaId(categoriaId: number): Promise<Produto[] | null>
}

export interface PedidoGatewayInterface {
    criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, status: Status): Promise<Pedido>
    criarProdutoPorPedido(pedido: Pedido, produtoPorPedidoDTO: AdicionaProdutoPorPedidoDTO): Promise<ProdutoPorPedido>
    encontrarPedidoPorId(pedidoId: number): Promise<Pedido | null>
    encontrarProdutosPorPedidoPorPedidoId(pedidoId: number): Promise<ProdutoPorPedido[]>
    alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<Pedido>
    listarPedidos(): Promise<Pedido[] | null>
    consultarStatusDoPagamento(pedidoId: number): Promise<PagamentoPorPedido>
    alterarStatusDoPagamento(pedidoId: number, status: string): Promise<PagamentoPorPedido>
    criarPagamentoPorPedido(pedidoId: number, status: StatusPagamento): Promise<PagamentoPorPedido>
}