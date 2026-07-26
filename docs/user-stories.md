# Backlog do Produto

Este documento apresenta o backlog do projeto **LogiTrack Pro**, organizado em Épicos e Histórias de Usuário. Cada história contém sua descrição, critérios de aceitação e tarefas técnicas necessárias para sua implementação.

---

# EP-01 - Gerenciamento de Viagens

## US-01 - Cadastrar Viagem

### Descrição

> Como **gestor da frota**,
> quero **cadastrar uma nova viagem**,
> para **manter o histórico de utilização dos veículos**.

### Critérios de Aceitação

- [ ] O sistema deve permitir selecionar um veículo previamente cadastrado.
- [ ] O sistema deve exigir o preenchimento da cidade de origem.
- [ ] O sistema deve exigir o preenchimento da cidade de destino.
- [ ] O sistema deve exigir a data e hora de saída.
- [ ] O sistema deve permitir informar a data e hora de chegada.
- [ ] A quilometragem percorrida deve ser maior que zero.
- [ ] A data de chegada não pode ser anterior à data de saída.
- [ ] Após o cadastro, a viagem deve ser salva no banco de dados.
- [ ] Após o cadastro, a viagem deve ser exibida na listagem.

### Tarefas Técnicas

#### Backend

- [ ] Criar a entidade `Viagem`.
- [ ] Criar Repository.
- [ ] Criar Service.
- [ ] Criar Controller.
- [ ] Criar DTOs de requisição e resposta.
- [ ] Implementar endpoint `POST /viagens`.
- [ ] Implementar validações.

#### Frontend

- [ ] Criar a página de cadastro de viagem.
- [ ] Desenvolver formulário de cadastro.
- [ ] Consumir o endpoint de cadastro.
- [ ] Exibir mensagens de sucesso e erro.

#### Testes

- [ ] Criar testes unitários.
- [ ] Criar testes de integração.

---

## US-02 - Listar Viagens

### Descrição

> Como **gestor da frota**,
> quero **visualizar todas as viagens cadastradas**,
> para **acompanhar o histórico operacional da frota**.

### Critérios de Aceitação

- [ ] O sistema deve listar todas as viagens cadastradas.
- [ ] Cada registro deve apresentar veículo, origem, destino, datas e quilometragem.
- [ ] A listagem deve permitir paginação.
- [ ] A listagem deve ser ordenada pela data de saída.
- [ ] O sistema deve informar quando não houver registros.

### Tarefas Técnicas

#### Backend

- [ ] Implementar endpoint `GET /viagens`.
- [ ] Implementar paginação.
- [ ] Implementar ordenação.

#### Frontend

- [ ] Criar tabela de viagens.
- [ ] Implementar paginação.
- [ ] Implementar ordenação.
- [ ] Exibir mensagem quando não houver registros.

#### Testes

- [ ] Criar testes automatizados.

---

## US-03 - Consultar Viagem

### Descrição

> Como **gestor da frota**,
> quero **visualizar os detalhes de uma viagem**,
> para **consultar todas as informações registradas**.

### Critérios de Aceitação

- [ ] O sistema deve permitir consultar uma viagem pelo identificador.
- [ ] Todos os dados da viagem devem ser exibidos.
- [ ] Caso a viagem não exista, o sistema deve informar o erro.

### Tarefas Técnicas

#### Backend

- [ ] Implementar endpoint `GET /viagens/{id}`.

#### Frontend

- [ ] Criar página de detalhes da viagem.
- [ ] Consumir endpoint de consulta.

#### Testes

- [ ] Criar testes automatizados.

---

## US-04 - Atualizar Viagem

### Descrição

> Como **gestor da frota**,
> quero **editar uma viagem cadastrada**,
> para **corrigir informações registradas incorretamente**.

### Critérios de Aceitação

- [ ] O sistema deve permitir alterar os dados da viagem.
- [ ] O sistema deve validar os campos obrigatórios.
- [ ] Alterações inválidas não devem ser persistidas.
- [ ] Após a atualização, os novos dados devem ser exibidos.

### Tarefas Técnicas

#### Backend

- [ ] Implementar endpoint `PUT /viagens/{id}`.
- [ ] Validar existência da viagem.

#### Frontend

- [ ] Criar tela de edição.
- [ ] Reutilizar formulário de cadastro.

#### Testes

- [ ] Atualizar testes unitários.
- [ ] Atualizar testes de integração.

---

## US-05 - Excluir Viagem

### Descrição

> Como **gestor da frota**,
> quero **remover uma viagem cadastrada**,
> para **eliminar registros incorretos ou duplicados**.

### Critérios de Aceitação

- [ ] O sistema deve solicitar confirmação antes da exclusão.
- [ ] Após a exclusão, a viagem não deve aparecer na listagem.
- [ ] Caso a viagem não exista, o sistema deve informar erro.

### Tarefas Técnicas

#### Backend

- [ ] Implementar endpoint `DELETE /viagens/{id}`.

#### Frontend

- [ ] Criar modal de confirmação.
- [ ] Atualizar listagem automaticamente.

#### Testes

- [ ] Criar testes automatizados.

---

# EP-02 - Dashboard Gerencial

## US-06 - Visualizar Dashboard

### Descrição

> Como **gestor da frota**,
> quero **visualizar indicadores operacionais da frota**,
> para **acompanhar o desempenho dos veículos e apoiar a tomada de decisão**.

### Critérios de Aceitação

- [ ] O sistema deve exibir a quilometragem total percorrida.
- [ ] O sistema deve exibir a quantidade de viagens por categoria de veículo.
- [ ] O sistema deve exibir o ranking dos veículos mais utilizados.
- [ ] O sistema deve exibir as próximas manutenções programadas.
- [ ] O sistema deve exibir o custo estimado das manutenções do mês.
- [ ] Os indicadores devem refletir os dados atuais do sistema.

### Tarefas Técnicas

#### Backend

- [ ] Criar `DashboardController`.
- [ ] Criar `DashboardService`.
- [ ] Criar consultas agregadas.
- [ ] Criar DTOs dos indicadores.

#### Frontend

- [ ] Criar página Dashboard.
- [ ] Criar cards de indicadores.
- [ ] Criar gráfico de pizza.
- [ ] Criar tabela de próximas manutenções.
- [ ] Consumir endpoints do dashboard.

#### Testes

- [ ] Criar testes automatizados.

---

# EP-03 - Infraestrutura e Qualidade

## US-07 - Documentar a API

### Descrição

> Como **desenvolvedor**,
> quero **consultar a documentação da API**,
> para **facilitar o desenvolvimento e a integração da aplicação**.

### Critérios de Aceitação

- [ ] Todos os endpoints devem estar documentados.
- [ ] A documentação deve estar disponível por meio do Swagger UI.
- [ ] Os modelos de requisição e resposta devem estar documentados.

### Tarefas Técnicas

- [ ] Configurar SpringDoc OpenAPI.
- [ ] Documentar os endpoints.
- [ ] Documentar os DTOs.
- [ ] Validar o funcionamento da documentação.

---

## US-08 - Disponibilizar o Projeto

### Descrição

> Como **avaliador técnico**,
> quero **executar o projeto facilmente**,
> para **avaliar todas as funcionalidades sem dificuldades de configuração**.

### Critérios de Aceitação

- [ ] O projeto deve ser executado utilizando Docker Compose.
- [ ] O README deve conter instruções completas de instalação e execução.
- [ ] O ambiente deve poder ser reproduzido localmente.

### Tarefas Técnicas

- [ ] Dockerizar o backend.
- [ ] Dockerizar o frontend.
- [ ] Configurar PostgreSQL.
- [ ] Criar arquivo `docker-compose.yml`.
- [ ] Elaborar README completo.
- [ ] Adicionar imagens do sistema ao repositório.

---

## US-09 - Garantir a Qualidade da Aplicação

### Descrição

> Como **desenvolvedor**,
> quero **garantir a qualidade da aplicação**,
> para **reduzir falhas durante sua evolução**.

### Critérios de Aceitação

- [ ] Os dados recebidos pela API devem ser validados.
- [ ] Requisições inválidas devem retornar mensagens padronizadas.
- [ ] Os principais fluxos da aplicação devem possuir testes automatizados.

### Tarefas Técnicas

#### Backend

- [ ] Implementar Bean Validation.
- [ ] Criar `GlobalExceptionHandler`.
- [ ] Criar `ErrorResponse`.
- [ ] Implementar testes unitários.
- [ ] Implementar testes de integração.

#### Frontend

- [ ] Tratar mensagens de erro retornadas pela API.
- [ ] Exibir feedback ao usuário.
- [ ] Criar testes dos principais componentes.
