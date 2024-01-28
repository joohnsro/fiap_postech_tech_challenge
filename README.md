# Tech Challenge - RM352718

<br />
Para facilitar, uma build e uma base de dados já estão disponíveis para execução.

<br />

* [Ambiente completo com Dockerfile e linha de comando](#dockerfile)
* [Ambiente completo com docker-compose](#docker-compose)
* [Scripts disponíveis](#comandos)

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

<h3 id="comandos">Comandos disponíveis</h3>
<br />

Cria uma nova build da aplicação que será usada pelos contêineres:
```bash
npm run build
```
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