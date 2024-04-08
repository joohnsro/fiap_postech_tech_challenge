# Tech Challenge - RM352718

<br />

* [Descrição do projeto](#descricao)
* [Entregáveis](#entregaveis)
* [Arquitetura](#arquitetura)
* [Passo-a-passo de instalação](#instalacao)
* [Durante a utilização da coleção da API](#utilizacao)
* [Outros scripts disponíveis](#scripts)

<br />

<h3 id="descricao">Descrição do projeto</h3>

Há uma lanchonete que está expandindo, sem um sistema de controle de pedidos, o atendimento é caótico e confuso.<br />
Para solucionar o problema, a lanchonete precisa de um sistema de autoatendimento de fast food.
<br />

<h3 id="entregaveis">Entregáveis</h3>

- Atualizar a aplicação da FASE 1 refatorando o código para seguir os padrões clean code e clean architecture:<br />
    - Alterar/criar as APIs
        - [x] Checkout Pedido deverá receber os produtos solicitados e retornar a identificação do pedido
        - [x] Consultar status pagamento pedido, que informa se o pagamento foi aprovado ou não
        - [x] Webhook para receber informação de pagamento aprovado ou recusado
        - [x] A lista de pedidos deverá retorná-lo com suas descrições, ordenados com a seguinte regra:
            - [x] Pronto > Em Preparação > Recebido
            - [x] Pedidos mais antigos primeiro e mais novos depois
            - [x] Pedidos com status Finalizado não devem aparecer na lista
        - [x] Atualizar o status do pedido
        - [x] Como desafio extra, opcionalmente, implementar a integração com Mercado Pago para gerar o QRCode para pagamento e integrar com o WebHook para capturar os pagamentos. Caso contrário, será necessário realiza o mock da parte de pagamentos. Como referência, acesse: site do mercado pago
        
- Criar uma arquitetura em Kubernetes que atenda os seguinte requisitos
    - [x] Os requisitos funcionais descritos nos itens anteriores (item problema)
    - [x] Escalabilidade com aumento e diminuição de Pods conforme demanda
    - [x] Os arquivos manifestos (yaml) precisam estar no GitHub junto com a nova versão do código

- Entrega da seguinte documentação no ReadMe:
    - [x] Desenho da arquitetura pensado por você, pessoa arquiteta de software, contemplando:
        - [x] Os requisitos do negócio (problema)
        - [x] Os requisitos de infraestrutura
            - [x] Você pode utiliza o Minikube, Docker Kubernetes, AKS,EKS, GKE ou qualquer nuvem que você desenha
    - [x] Collection com todas as APIs desenvolvidas com exemplo de requisição (que não seja vazia):
        - [x] Link do Swagger no projeto ou link para download da collection do Postman (JSON)
    - [x] Guia completo com todas as instruções para execução do projeto e a ordem de execução das APIs, caso seja necessário
    - [x] Link para vídeo demonstrando a arquitetura desenvolvida na nuvem ou localmente
        - [x] O vídeo deve ser postado no Youtube ou Vimeo
        - [x] Não esqueça de deixá-lo público ou não listado

- No arquivo entregue na plataforma, é necessário somente colocar a URL do Github com as informações
<br /><br />


<h3 id="arquitetura">Desenhos da Arquitetura</h3>

- Os requisitos do negócio (problema):
    - Acessar arquivo na pasta: <br />
        arquitetura/arquitetura-requisitos-do-negocio.png
- Os requisitos de infraestrutura:
    - Acessar arquivo na pasta: <br />
        arquitetura/arquitetura-requisitos-de-infraestrutura.png
<br /><br />

<h3 id="instalacao">Passo-a-passo de instalação</h3>

***Observação**<br />
Para a criação e implementação do projeto foi utilizado o Minikube à partir de um Docker Client do Windows.
<br />

0- Verifica e cria as métricas para utilização:
```bash
// Checa métricas
kubectl top node

// Em caso de não encontrar métricas, criar usando:
kubectl apply -f kubernetes/metrics.yaml
```

1- Cria um ConfigMap com os dados sensíveis:
```bash
kubectl apply -f kubernetes/configmap.yaml
```
<br />

2- Cria um POD e Service do banco de dados:
```bash
kubectl apply -f kubernetes/mariadb/mariadb-pod.yaml
kubectl apply -f kubernetes/mariadb/mariadb-service.yaml
```
<br />

3- Acessar e popular banco de dados:
```bash
// Acessa o pod
kubectl exec -it mariadb-pod sh

// Acessa o MariaDB
mariadb -u admin -pOTIsxb71HcC0WyA1UPNIzcvuMJ1Xu6NJ

// Define o banco corretamente
use tech_challenge;

// Copia, cole e execute todo o conteúdo do arquivo disponibilizado em:
// kubernetes/mariadb/database.sql
```
<br />

4- Captura o podIP do POD do banco de dados:
```bash
kubectl get pods -l app=mariadb-pod -o yaml | grep podIP

// Retornará algo como:
// podIp: 10.244.1.63
```
<br />

5- Atualiza o arquivo de deployment da api com o novo IP do banco de dados:
```bash
// kubernetes/api/deployment.yaml
    ...
    env: 
        - name: MARIADB_HOST
          value: 10.244.1.63
    ...
```
<br />

6- Cria um POD, Service e HPA (para escalar aplicação quando necessário) da api:
```bash
kubectl apply -f kubernetes/api/deployment.yaml
kubectl apply -f kubernetes/api/hpa.yaml
kubectl apply -f kubernetes/api/service.yaml
```
<br />

7- Disponibiliza o Service da API para utilização e exibe a url da aplicação:
```bash
minikube service tech-challenge-api-service --url
```
<br />

8- Com a url em mãos atualizar a variável *api_host* da coleção do Postman para execução.
<br /><br />

<h3 id="utilizacao">Durante a utilização da coleção da API</h3>
<br />

O sistema de pagamento foi mockado, sendo assim para simular o retorno esperado do pagamento foi criado a rota webhook/pagamento.<br />
Assim como exemplicado na coleção, tanto o pedidoId quanto o status serão necessários para a exemplificação do funcionamento, tendo apenas o status "APRO" disponível no momento.
<br />


<h3 id="scripts">Outros scripts disponíveis</h3>
<br />

Executa a aplicação em modo de desenvolvimento com *hot reload*, em caso de uso será necessário alterar o arquivo *nodemon.json* com as variáveis de ambiente corretas:
```bash
npm run dev
```
<br />

Executa os testes unitários da aplicação:
```bash
npm run test
```
<br />

Executa o teste de carga usando k6:
```bash
npm run k6
```
<br />

Gera um build da aplicação:
```bash
npm run build
```