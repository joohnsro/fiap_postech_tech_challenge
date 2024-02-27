# Tech Challenge - RM352718

<br />
Já está disponível uma base de dados para a rápida execução da aplicação.

<br />

* [Descrição do projeto](#descricao)
* [Entregáveis](#entregaveis)
* [Passo-a-passo de instalação](#instalacao)
* [Ambiente completo com Dockerfile e linha de comando](#dockerfile)
* [Ambiente completo com docker-compose](#docker-compose)
* [Outros scripts disponíveis](#scripts)

<br />

<h3 id="descricao">Descrição do projeto</h3>

Há uma lanchonete que está expandindo, sem um sistema de controle de pedidos, o atendimento é caótico e confuso.<br />
Para solucionar o problema, a lanchonete precisa de um sistema de autoatendimento de fast food.
<br />

<h3 id="entregaveis">Entregáveis</h3>

- Documentação do sistema (DDD) utlizando a linguagem úbiqua, dos seguintes fluxos:<br />
a. Realização do pedido e pagamento<br />
b. Preparação e entrega do pedido<br />

- Uma aplicação para todo sistema de backend (monolito) que deverpa ser desenvolvido seguindo os padrões apresentados nas aulas:<br />
    - a. Utilizando arquitetura hexagonal
    - b. APIs
        - Cadastro do Cliente
        - Identificação do Cliente via CPF
        - Criar, editar e remover produto
        - Buscar produtos por categoria
        - Fake checkout, apenas enviar os produtos escolhidos para a fila
        - Listar os pedidos
    - c. Aplicação deverá ser escalável para atender grandes volumes nos horário de pico
    - d. banco de dados a sua escolha
        - Inicialmente deveremos trabalhar e organizar a fila dos pedidos apenas em banco de dados

- A aplicação deve ser entregue com um Dockerfile configurado para executá-la corretamente.
    - Para validação da POC, temos a seguinte limitação de infraestrutura:
        - 1 instância para banco de dados
        - 1 instância para executar aplicação
    - Não será necessário o desenvolvimento de interfaces para o frontend, o foco deve ser total no backend
<br /><br />


<h3 id="instalacao">Passo-a-passo de instalação</h3>

1- Instala as dependências:
```bash
npm run install-environment
```
<br />

2- Cria a build:
```bash
npm run build
```
<br />


<h3 id="dockerfile">Ambiente completo com Dockerfile e linha de comando</h3>
<br />

1 - Cria a rede:
```bash
docker network create --driver bridge tech_challenge_net
```
<br />

2 - Cria o container responsável pelo banco de dados:

```bash
# O comando $(pwd -W) está disponível no Windows, 
# em caso de utilização em outro sistema operacional pode se fazer
# necessário alterá-lo para ${PWD} ou similar, de acordo com o sistema escolhido
docker run --detach --network tech_challenge_net -p 3306:3306 -v "$(pwd -W)/docker/mariadb/db_data:/var/lib/mysql" -v "$(pwd -W)/docker/mariadb/sql:/home/sql" --name mariadb --env MARIADB_USER=admin --env MARIADB_PASSWORD=OTIsxb71HcC0WyA1UPNIzcvuMJ1Xu6NJ --env MARIADB_ROOT_PASSWORD=dGE9iy71a18xRbeNd6RCl2EKhqn656Oj --env MARIADB_DATABASE=tech_challenge mariadb:10.6.4-focal
```
<br />

3 - Cria a imagem responsável pela api:

```bash
docker build -t api -f ./docker/api/Dockerfile .
```
<br />

4 - Cria o container responsável pela api:

```bash
docker run --detach --network tech_challenge_net -p 3000:3000 --name api api
```
<br />

<h3 id="docker-compose">Ambiente completo com docker-compose</h3>

1 - Cria o ambiente completo:
```bash
docker compose -p tech_challenge -f ./docker/docker-environment.yml up --detach
```
<br />


**OPCIONAL**<br />
Caso não tenha dados no banco será necessário executar a seguintes ações:
<br />

```bash
# Abre o terminal do container
docker exec -it mariadb bash

# Popula a base de dados
mariadb -u root -pdGE9iy71a18xRbeNd6RCl2EKhqn656Oj tech_challenge < /home/sql/database.sql
```
<br />

<h3 id="scripts">Outros scripts disponíveis</h3>
<br />

Executa a aplicação em modo de desenvolvimento com *hot reload*:
```bash
npm run dev
```
<br />

Executa os testes unitários da aplicação:
```bash
npm run jest
```