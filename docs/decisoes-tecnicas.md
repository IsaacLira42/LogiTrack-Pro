# 🧠 Decisões Técnicas

## 📌 Visão Geral

Durante o desenvolvimento do **LogiTrack Pro**, diversas decisões técnicas foram tomadas com o objetivo de:

- Melhorar a qualidade do código.
- Garantir integridade dos dados.
- Facilitar manutenção e evolução da aplicação.
- Criar uma arquitetura organizada e escalável.

Este documento apresenta as principais escolhas realizadas durante a implementação e as justificativas para cada decisão.

---

# 🏗️ Escolha da Arquitetura

## Backend em camadas

Foi adotada uma arquitetura baseada em camadas utilizando o padrão:

```text
Controller
    |
    ↓
Service
    |
    ↓
Repository
    |
    ↓
Database
```

## 🎯 Motivação

A separação de responsabilidades evita que regras de negócio fiquem espalhadas pela aplicação, tornando o sistema mais organizado e fácil de evoluir.

### Responsabilidades definidas:

| Camada        | Responsabilidade                        |
| ------------- | --------------------------------------- |
| 🎮 Controller | Exposição dos endpoints REST            |
| ⚙️ Service    | Regras de negócio e fluxo da aplicação  |
| 🗄️ Repository | Acesso e consultas ao banco de dados    |
| 📦 Entity     | Representação das entidades persistidas |
| 🔄 DTO        | Comunicação entre API e frontend        |

### Benefícios:

- Código mais organizado.
- Facilidade de manutenção.
- Melhor testabilidade.
- Redução de acoplamento entre componentes.

---

# 🛣️ Escolha do Módulo de CRUD

O desafio permitia escolher entre:

- Gestão de viagens.
- Gestão de manutenção.

Foi escolhido desenvolver o módulo de **Viagens**.

---

## 🎯 Justificativa

A entidade **Viagem** possui maior impacto operacional, pois está diretamente relacionada aos principais indicadores utilizados no dashboard:

- 🚚 Quilometragem percorrida.
- 🏆 Ranking de utilização dos veículos.
- 📊 Volume de viagens por categoria.
- 📈 Evolução de utilização da frota.

Além disso, a viagem possui relacionamento direto com veículos, permitindo gerar dados analíticos para acompanhamento operacional.

---

# 🗄️ Alterações no Modelo de Banco de Dados

O banco inicial fornecido pelo desafio foi utilizado como base, porém foram realizadas algumas alterações para melhorar a consistência e adequação ao domínio da aplicação.

A versão atualizada do banco está disponível em:

```text
docs/banco/V2
```

---

# 🚫 Remoção do comportamento ON DELETE CASCADE

## Modelo inicial

A tabela possuía:

```sql
veiculo_id INTEGER REFERENCES veiculos(id) ON DELETE CASCADE
```

---

## Alteração realizada

O comportamento de exclusão em cascata foi removido.

---

## 🎯 Motivo

A exclusão de um veículo não deve remover automaticamente seu histórico operacional.

Um veículo pode possuir informações importantes como:

- 🛣️ Viagens realizadas.
- 🔧 Custos de manutenção.
- 📊 Histórico de utilização.

Esses dados possuem valor analítico e devem ser preservados.

---

# 🔗 Relacionamentos Obrigatórios

Foram adicionadas restrições para garantir que registros dependentes sempre possuam vínculos válidos.

Exemplo:

```java
@ManyToOne
@JoinColumn(nullable = false)
private Veiculo veiculo;
```

Aplicado em:

- Viagem.
- Manutenção.

---

## 🎯 Motivo

Uma viagem sem veículo associado ou uma manutenção sem veículo relacionado representa um registro inválido dentro das regras do domínio.

---

# ✅ Campos Obrigatórios

Alguns campos inicialmente permitiam valores nulos, porém foram alterados para garantir maior consistência dos dados.

---

## 🛣️ Viagem

Antes:

```sql
origem VARCHAR(100)
destino VARCHAR(100)
km_percorrida DECIMAL(10,2)
```

Depois:

```sql
origem VARCHAR(100) NOT NULL
destino VARCHAR(100) NOT NULL
km_percorrida DECIMAL(10,2) NOT NULL
```

---

## 🎯 Justificativa

Essas informações são essenciais para:

- Identificar o trajeto realizado.
- Calcular indicadores.
- Alimentar o dashboard analítico.

---

# 📏 Validações de Domínio

Além das validações estruturais do banco, foram implementadas regras específicas do negócio.

---

## 🛣️ Período da viagem

Uma viagem não pode possuir data de chegada anterior à saída.

Regra:

```java
dataChegada > dataSaida
```

Caso contrário, o registro é rejeitado.

---

## 🔧 Período da manutenção

Uma manutenção finalizada não pode possuir data anterior ao início.

Regra:

```java
dataFinalizacao >= dataInicio
```

---

# 📦 Uso de DTOs

As entidades JPA não são retornadas diretamente pela API.

Foram criados objetos específicos para comunicação entre backend e frontend.

Exemplos:

```text
ViagemRequestDTO
ViagemResponseDTO
DashboardResponseDTO
DetalhesVeiculoDTO
```

---

## 🎯 Motivos

A utilização de DTOs permite:

- 🔒 Evitar exposição da estrutura interna do banco.
- 🎛️ Controlar os dados retornados pela API.
- 🔗 Reduzir acoplamento entre frontend e backend.
- 🚀 Facilitar alterações futuras no modelo.

---

# ⚡ Uso de Projections

Para consultas analíticas foram utilizadas **Spring Data Projections**.

Exemplo:

```java
RankingUtilizacaoProjection
```

---

Em vez de carregar toda uma entidade:

```text
Veiculo
 ├── viagens
 └── manutencoes
```

A consulta retorna somente os dados necessários:

```text
placa
modelo
kmTotal
```

---

## Benefícios

- ⚡ Menor consumo de memória.
- 📉 Menor quantidade de dados trafegados.
- 🎯 Consultas mais específicas.
- 📊 Melhor desempenho em relatórios.

---

# 📊 Uso de SQL Nativo no Dashboard

As métricas do dashboard foram implementadas utilizando consultas SQL nativas.

Exemplos:

- Soma de quilômetros.
- Contagem de viagens.
- Ranking de veículos.
- Projeção financeira.

---

## 🎯 Justificativa

Consultas analíticas geralmente envolvem:

- Agregações.
- Agrupamentos.
- Ordenações.
- Operações específicas do banco.

O uso de SQL explícito permite:

- Maior controle sobre as consultas.
- Melhor leitura das regras analíticas.
- Aproveitamento dos recursos do PostgreSQL.

---

# 🛫 Versionamento do Banco com Flyway

O projeto utiliza **Flyway** para controle das alterações estruturais do banco.

Estrutura:

```text
resources
└── db
    └── migration
        └── V1__Initial_Schema.sql
```

---

## 🎯 Motivos

O versionamento evita alterações manuais inconsistentes no banco.

Benefícios:

- 📚 Histórico das mudanças.
- 🔄 Reprodutibilidade do ambiente.
- 👨‍💻 Facilidade para novos desenvolvedores configurarem o projeto.

---

# 🛡️ Estratégia de Validação

As validações foram distribuídas entre diferentes camadas da aplicação.

---

## Bean Validation

Responsável por validar dados de entrada.

Exemplos:

```java
@NotBlank
@NotNull
@Positive
@Size
```

---

## Service

Responsável pelas regras de negócio.

Exemplo:

```java
validarPeriodo()
```

---

## Banco de Dados

Responsável por garantir integridade estrutural.

Exemplos:

- NOT NULL.
- UNIQUE.
- FOREIGN KEY.

---

# ⚛️ Gerenciamento de Estado no Frontend

Foi utilizado:

```text
TanStack React Query
```

---

## 🎯 Justificativa

A aplicação possui diversos dados consumidos da API:

- 📊 Dashboard.
- 🚘 Veículos.
- 🛣️ Viagens.
- 🔧 Manutenções.

O React Query permite:

- Cache automático.
- Controle de atualização.
- Reutilização dos dados carregados.
- Tratamento de estados de carregamento e erro.

---

# 🧩 Organização do Frontend por Features

O frontend foi estruturado por domínio:

```text
features
├── dashboard
├── veiculos
├── viagens
└── manutencoes
```

---

## 🎯 Justificativa

Essa organização mantém componentes, serviços e hooks próximos ao contexto onde são utilizados.

Benefícios:

- 📁 Código mais organizado.
- 🔧 Facilidade de manutenção.
- 📈 Melhor escalabilidade.

---

# 🐳 Uso de Docker

Foram criados ambientes containerizados utilizando Docker.

Serviços:

- PostgreSQL.
- Backend Spring Boot.
- Frontend React.

---

## 🎯 Motivos

O uso de containers permite:

- 🌎 Padronização do ambiente.
- 🚀 Facilidade de execução.
- ⚙️ Redução de problemas de configuração.

---

# 🌐 Deploy

A aplicação foi disponibilizada em ambiente externo para demonstrar uma versão funcional além do ambiente local.

---

## Backend

URL:

```text
https://logitrack-pro-1sp1.onrender.com
```

---

## Frontend

URL:

```text
https://logitrack-pro-lyart.vercel.app/
```

---

# ✅ Considerações Finais

As decisões tomadas durante o desenvolvimento tiveram como objetivo construir uma aplicação:

- Organizada.
- Com separação clara de responsabilidades.
- Com integridade dos dados.
- Preparada para futuras evoluções.

A arquitetura escolhida permite que novas funcionalidades sejam adicionadas de forma mais segura, mantendo a qualidade e a manutenibilidade do sistema.
