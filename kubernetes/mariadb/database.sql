CREATE TABLE IF NOT EXISTS tech_challenge.clientes (
    id int NOT NULL AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    cpf char(14) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tech_challenge.produtos (
    id int NOT NULL AUTO_INCREMENT,
    categoriaId int NOT NULL,
    nome varchar(255) NOT NULL,
    valor float(10) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tech_challenge.categorias (
    id int NOT NULL AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tech_challenge.produtos_por_pedido (
    pedidoId int NOT NULL,
    produtoId int NOT NULL,
    quantidade int(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS tech_challenge.pedidos (
    id int NOT NULL AUTO_INCREMENT,
    clienteId int NOT NULL,
    status int(2) NOT NULL,
    data datetime DEFAULT CURRENT_TIMESTAMP,
    observacao varchar(255) NULL,
    valor float(10) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tech_challenge.pagamento_por_pedido (
    pedidoId int NOT NULL,
    status char(20) NOT NULL
);

INSERT INTO tech_challenge.clientes (nome, cpf) VALUES ('Fulano', '111.222.333-44');
INSERT INTO tech_challenge.clientes (nome, cpf) VALUES ('Ciclano', '555.666.777-88');
INSERT INTO tech_challenge.produtos (categoriaId, nome, valor) VALUES (1, 'X Salada', 22.90);
INSERT INTO tech_challenge.produtos (categoriaId, nome, valor) VALUES (2, 'Coca-cola', 7.5);
INSERT INTO tech_challenge.categorias (nome) VALUES ('Lanches');
INSERT INTO tech_challenge.categorias (nome) VALUES ('Bebidas');
INSERT INTO tech_challenge.categorias (nome) VALUES ('Acompanhamentos');
INSERT INTO tech_challenge.categorias (nome) VALUES ('Sobremesas');
INSERT INTO tech_challenge.pedidos (clienteId, status, valor) VALUES (1, 3, 22.90);
INSERT INTO tech_challenge.pedidos (clienteId, status, valor) VALUES (2, 2, 30.40);
INSERT INTO tech_challenge.pedidos (clienteId, status, valor) VALUES (1, 0, 22.90);
INSERT INTO tech_challenge.produtos_por_pedido (pedidoId, produtoId, quantidade) VALUES (1, 1, 1);
INSERT INTO tech_challenge.produtos_por_pedido (pedidoId, produtoId, quantidade) VALUES (2, 1, 1);
INSERT INTO tech_challenge.produtos_por_pedido (pedidoId, produtoId, quantidade) VALUES (2, 2, 1);
INSERT INTO tech_challenge.produtos_por_pedido (pedidoId, produtoId, quantidade) VALUES (3, 1, 1);
INSERT INTO tech_challenge.pagamento_por_pedido (pedidoId, status) VALUES (1, 'APRO');
INSERT INTO tech_challenge.pagamento_por_pedido (pedidoId, status) VALUES (2, 'APRO');
INSERT INTO tech_challenge.pagamento_por_pedido (pedidoId, status) VALUES (3, 'CONT');