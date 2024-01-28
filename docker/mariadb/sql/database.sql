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
    id int NOT NULL AUTO_INCREMENT,
    pedidoId int NOT NULL,
    produtoId int NOT NULL,
    quantidade int(3) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tech_challenge.pedidos (
    id int NOT NULL AUTO_INCREMENT,
    clienteId int NOT NULL,
    status char(15) NOT NULL,
    data datetime DEFAULT CURRENT_TIMESTAMP,
    observacao varchar(255) NULL,
    valor float(10) NOT NULL, 
    PRIMARY KEY (id)
);

INSERT INTO tech_challenge.clientes (nome, cpf) VALUES ('Fulano', '111.222.333-44');
INSERT INTO tech_challenge.clientes (nome, cpf) VALUES ('Ciclano', '555.666.777-88');
INSERT INTO tech_challenge.produtos (categoriaId, nome, valor) VALUES (1, 'X Salada', 22.90);
INSERT INTO tech_challenge.produtos (categoriaId, nome, valor) VALUES (2, 'Coca-cola', 7.5);
INSERT INTO tech_challenge.categorias (nome) VALUES ('Lanches');
INSERT INTO tech_challenge.categorias (nome) VALUES ('Bebidas');
INSERT INTO tech_challenge.categorias (nome) VALUES ('Acompanhamentos');
INSERT INTO tech_challenge.categorias (nome) VALUES ('Sobremesas');
INSERT INTO tech_challenge.pedidos (clienteId, status, valor) VALUES (1, 'pronto', 22.90);
INSERT INTO tech_challenge.pedidos (clienteId, status, valor) VALUES (2, 'em-preparacao', 30.40);
INSERT INTO tech_challenge.produtos_por_pedido (pedidoId, produtoId, quantidade) VALUES (1, 1, 1);
INSERT INTO tech_challenge.produtos_por_pedido (pedidoId, produtoId, quantidade) VALUES (2, 1, 1);
INSERT INTO tech_challenge.produtos_por_pedido (pedidoId, produtoId, quantidade) VALUES (2, 2, 1);