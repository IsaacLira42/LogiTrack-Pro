# Backlog do Produto

Este documento apresenta o backlog do projeto **LogiTrack Pro**, organizado em Épicos e Histórias de Usuário. Cada história contém sua descrição, critérios de aceitação e tarefas técnicas necessárias para sua implementação.

---

# EP-01 - Gerenciamento de Viagens

## US-01 - Cadastrar Viagem

### Descrição

> Como **gestor da frota**,
> quero **cadastrar uma nova viagem**,
> para **manter o histórico de deslocamentos dos veículos**.

### Critérios de Aceitação

- [ ] O sistema deve permitir selecionar um veículo previamente cadastrado.
- [ ] O sistema deve exigir o preenchimento da cidade de origem.
- [ ] O sistema deve exigir o preenchimento da cidade de destino.
- [ ] O sistema deve exigir a data e hora de saída.
- [ ] O sistema deve permitir informar a data e hora de chegada.
- [ ] A quilometragem percorrida deve ser maior que zero.
- [ ] O sistema deve salvar a viagem no banco de dados.
- [ ] Após o cadastro, a viagem deve ser exibida na listagem.

### Tarefas Técnicas

- [ ] Criar a entidade `Viagem`.
- [ ] Criar DTOs de requisição e resposta.
- [ ] Implementar validações utilizando Bean Validation.
- [ ] Implementar endpoint `POST /viagens`.
- [ ] Criar testes unitários.
- [ ] Criar testes de integração.

---

## US-02 - Listar Viagens

### Descrição

> Como **gestor da frota**,
> quero **visualizar todas as viagens cadastradas**,
> para **acompanhar o histórico operacional da empresa**.

### Critérios de Aceitação

- [ ] O sistema deve listar todas as viagens cadastradas.
- [ ] Cada registro deve apresentar veículo, origem, destino, datas e quilometragem.
- [ ] A listagem deve ser ordenada pela data de saída.
- [ ] O sistema deve informar quando não houver registros.

### Tarefas Técnicas

- [ ] Implementar endpoint `GET /viagens`.
- [ ] Implementar paginação.
- [ ] Implementar ordenação.
- [ ] Criar testes automatizados.

---

## US-03 - Atualizar Viagem

### Descrição

> Como **gestor da frota**,
> quero **editar uma viagem cadastrada**,
> para **corrigir informações registradas incorretamente**.

### Critérios de Aceitação

- [ ] O sistema deve permitir alterar qualquer informação da viagem.
- [ ] O sistema deve validar os campos obrigatórios.
- [ ] Alterações inválidas não devem ser persistidas.
- [ ] Após a atualização, os novos dados devem ser exibidos na listagem.

### Tarefas Técnicas

- [ ] Implementar endpoint `PUT /viagens/{id}`.
- [ ] Validar existência da viagem.
- [ ] Atualizar testes unitários.
- [ ] Atualizar testes de integração.

---

## US-04 - Excluir Viagem

### Descrição

> Como **gestor da frota**,
> quero **remover uma viagem cadastrada**,
> para **eliminar registros incorretos ou duplicados**.

### Critérios de Aceitação

- [ ] O sistema deve solicitar confirmação antes da exclusão.
- [ ] Após excluir, a viagem não deve mais aparecer na listagem.
- [ ] Caso a viagem não exista, deve retornar erro 404.

### Tarefas Técnicas

- [ ] Implementar endpoint `DELETE /viagens/{id}`.
- [ ] Criar tratamento global de exceções.
- [ ] Criar testes automatizados.

---

# EP-02 - Dashboard Gerencial

## US-05 - Visualizar Dashboard

### Descrição

> Como **gestor da frota**,
> quero **visualizar indicadores operacionais**,
> para **acompanhar o desempenho da frota e apoiar a tomada de decisão**.

### Critérios de Aceitação

- [ ] O sistema deve apresentar todos os indicadores em uma única tela.
- [ ] As informações devem ser carregadas diretamente do banco de dados.
- [ ] Os dados apresentados devem estar atualizados.

### Tarefas Técnicas

- [ ] Criar `DashboardController`.
- [ ] Criar `DashboardService`.
- [ ] Criar `DashboardRepository`.

---

## US-06 - Consultar Total de Quilometragem

### Descrição

> Como **gestor da frota**,
> quero **visualizar a quilometragem total percorrida**,
> para **acompanhar a utilização da frota**.

### Critérios de Aceitação

- [ ] O sistema deve exibir a quilometragem total da frota.
- [ ] O sistema deve permitir consultar um veículo específico.
- [ ] Os valores devem ser atualizados automaticamente após novos cadastros.

### Tarefas Técnicas

- [ ] Implementar consulta SQL.
- [ ] Criar endpoint para disponibilizar o indicador.
- [ ] Exibir o resultado no dashboard.

---

## US-07 - Consultar Volume de Viagens por Categoria

### Descrição

> Como **gestor da frota**,
> quero **visualizar a quantidade de viagens por categoria de veículo**,
> para **analisar a utilização entre veículos leves e pesados**.

### Critérios de Aceitação

- [ ] O sistema deve agrupar as viagens por categoria.
- [ ] O resultado deve ser apresentado em gráfico.
- [ ] As informações devem ser obtidas via consulta SQL.

### Tarefas Técnicas

- [ ] Criar consulta SQL.
- [ ] Criar DTO específico.
- [ ] Exibir gráfico de pizza.

---

## US-08 - Consultar Cronograma de Manutenção

### Descrição

> Como **gestor da frota**,
> quero **visualizar as próximas manutenções agendadas**,
> para **planejar a disponibilidade dos veículos**.

### Critérios de Aceitação

- [ ] O sistema deve listar apenas manutenções pendentes.
- [ ] O sistema deve ordenar pela data mais próxima.
- [ ] O sistema deve limitar a exibição aos cinco primeiros registros.

### Tarefas Técnicas

- [ ] Criar consulta SQL.
- [ ] Criar endpoint específico.
- [ ] Exibir tabela no dashboard.

---

## US-09 - Consultar Ranking de Utilização

### Descrição

> Como **gestor da frota**,
> quero **identificar o veículo mais utilizado**,
> para **acompanhar o desempenho operacional da frota**.

### Critérios de Aceitação

- [ ] O sistema deve identificar o veículo com maior quilometragem acumulada.
- [ ] O sistema deve apresentar a quilometragem total correspondente.

### Tarefas Técnicas

- [ ] Criar consulta SQL.
- [ ] Criar DTO.
- [ ] Exibir indicador no dashboard.

---

## US-10 - Consultar Projeção Financeira

### Descrição

> Como **gestor da frota**,
> quero **visualizar o custo estimado das manutenções do mês atual**,
> para **acompanhar os gastos previstos da frota**.

### Critérios de Aceitação

- [ ] O sistema deve somar os custos estimados das manutenções do mês atual.
- [ ] O valor deve ser exibido em formato monetário.
- [ ] O resultado deve ser atualizado automaticamente.

### Tarefas Técnicas

- [ ] Criar consulta SQL.
- [ ] Criar endpoint específico.
- [ ] Exibir indicador financeiro.

---

# EP-03 - Qualidade e Entrega

## US-11 - Documentar a API

### Descrição

> Como **desenvolvedor**,
> quero **documentar os endpoints da API**,
> para **facilitar o consumo e manutenção do sistema**.

### Critérios de Aceitação

- [ ] Todos os endpoints devem estar documentados.
- [ ] A documentação deve ser acessível via Swagger UI.

### Tarefas Técnicas

- [ ] Configurar SpringDoc OpenAPI.
- [ ] Adicionar descrições aos endpoints.
- [ ] Validar funcionamento da documentação.

---

## US-12 - Disponibilizar o Projeto

### Descrição

> Como **avaliador técnico**,
> quero **executar o projeto facilmente**,
> para **avaliar suas funcionalidades sem dificuldades de configuração**.

### Critérios de Aceitação

- [ ] O projeto deve ser executado utilizando Docker Compose.
- [ ] O README deve conter instruções completas de instalação e execução.
- [ ] O repositório deve conter todas as informações necessárias para reproduzir o ambiente local.

### Tarefas Técnicas

- [ ] Criar arquivo `docker-compose.yml`.
- [ ] Dockerizar backend.
- [ ] Dockerizar banco de dados PostgreSQL.
- [ ] Elaborar README completo.
- [ ] Adicionar imagens do sistema ao repositório.

# EP-04 - Qualidade de Software

## US-13 - Validar Dados de Entrada

### Descrição

> Como **sistema**,
> quero **validar os dados recebidos nas requisições**,
> para **garantir a integridade das informações persistidas**.

### Critérios de Aceitação

- [ ] Campos obrigatórios devem ser validados.
- [ ] Valores inválidos devem retornar HTTP 400.
- [ ] As mensagens de erro devem ser claras.

### Tarefas Técnicas

- [ ] Utilizar Bean Validation.
- [ ] Criar mensagens personalizadas.
- [ ] Implementar testes unitários.

---

## US-14 - Tratar Exceções da API

### Descrição

> Como **consumidor da API**,
> quero **receber mensagens padronizadas de erro**,
> para **identificar facilmente problemas durante as requisições**.

### Critérios de Aceitação

- [ ] Erros devem retornar JSON padronizado.
- [ ] Erros 400, 404 e 500 devem possuir mensagens específicas.

### Tarefas Técnicas

- [ ] Criar GlobalExceptionHandler.
- [ ] Criar ErrorResponse.
- [ ] Implementar testes.

---

## US-15 - Executar Testes Automatizados

### Descrição

> Como **desenvolvedor**,
> quero **garantir o funcionamento das funcionalidades implementadas**,
> para **reduzir regressões durante a evolução do sistema**.

### Critérios de Aceitação

- [ ] Os principais fluxos devem possuir testes.
- [ ] Todos os testes devem ser executados com sucesso.

### Tarefas Técnicas

- [ ] Criar testes unitários.
- [ ] Criar testes de integração.
- [ ] Validar cobertura dos principais casos.
