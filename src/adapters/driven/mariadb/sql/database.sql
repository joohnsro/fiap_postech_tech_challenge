CREATE TABLE clientes (
    id int NOT NULL AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    cpf char(14) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE produtos (
    id int NOT NULL AUTO_INCREMENT,
    categoriaId int NOT NULL,
    nome varchar(255) NOT NULL,
    valor int(11) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE categorias (
    id int NOT NULL AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE produtos_por_pedido (
    produtoId int NOT NULL,
    quantidade int(3) NOT NULL
);

CREATE TABLE pedidos (
    id int NOT NULL AUTO_INCREMENT,
    clienteId int NOT NULL,
    status char(15) NOT NULL,
    data datetime NOT NULL DEFAULT(GETDATE()),
    observacao varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO clientes (nome, cpf) VALUES ('Fulano', '111.222.333-44');
INSERT INTO clientes (nome, cpf) VALUES ('Ciclano', '555.666.777-88');
INSERT INTO produtos (categoriaId, nome, valor) VALUES (1, 'X Salada', 22.90);
INSERT INTO produtos (categoriaId, nome, valor) VALUES (2, 'Coca-cola', 7.5);
INSERT INTO categorias (nome) VALUES ('Lanches');
INSERT INTO categorias (nome) VALUES ('Bebidas');
INSERT INTO categorias (nome) VALUES ('Acompanhamentos');
INSERT INTO categorias (nome) VALUES ('Sobremesas');
INSERT INTO pedidos (clientId, status, observacao) VALUES (1, 'pronto', '')
INSERT INTO pedidos (clientId, status, observacao) VALUES (2, 'em-preparacao', '')