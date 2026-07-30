# 🏗️ Arquitetura do Sistema

## 📌 Visão Geral

O **LogiTrack Pro** foi desenvolvido utilizando uma arquitetura baseada em camadas no backend e uma organização orientada a funcionalidades no frontend.

A aplicação tem como objetivo centralizar informações relacionadas à operação de uma frota logística, permitindo:

- 🚚 Gerenciamento de viagens.
- 🚘 Consulta de veículos.
- 🔧 Acompanhamento de manutenções.
- 📊 Análise de indicadores operacionais através de um dashboard.

A arquitetura foi projetada buscando:

- ✅ Separação clara de responsabilidades.
- 🔧 Facilidade de manutenção.
- 🔗 Baixo acoplamento entre componentes.
- 📈 Organização escalável.
- 🔄 Controle adequado do fluxo de dados.

---

# ⚙️ Arquitetura Backend

O backend foi desenvolvido utilizando **Spring Boot**, seguindo uma arquitetura em camadas:

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

Cada camada possui responsabilidades específicas dentro da aplicação, evitando concentração de regras em um único ponto.

---

# 🎮 Controller

Responsável pela exposição dos endpoints REST da aplicação.

## Principais responsabilidades:

- Receber requisições HTTP.
- Validar dados de entrada.
- Encaminhar operações para a camada de serviço.
- Retornar respostas HTTP adequadas.

## Recursos disponibilizados:

| Recurso        | Endpoint       |
| -------------- | -------------- |
| 📊 Dashboard   | `/dashboard`   |
| 🚘 Veículos    | `/veiculos`    |
| 🛣️ Viagens     | `/viagens`     |
| 🔧 Manutenções | `/manutencoes` |

---

# ⚙️ Service

A camada de serviço concentra as regras de negócio e a orquestração das operações da aplicação.

## Responsabilidades:

- Aplicar validações de negócio.
- Coordenar chamadas aos repositories.
- Converter dados entre entidades, projections e DTOs.
- Controlar operações transacionais.

---

## 🛣️ ViagemService

Responsável pelo fluxo completo de gerenciamento de viagens.

Funcionalidades:

- Cadastro.
- Atualização.
- Exclusão.
- Consulta.
- Aplicação de filtros.

Também realiza validações como:

- Existência do veículo associado.
- Validação do período da viagem.

Exemplo: Uma viagem não pode possuir uma data de chegada anterior à data de saída.

---

## 📊 DashboardService

Responsável pela consolidação dos dados analíticos da aplicação.

Realiza a composição das métricas:

- 🚚 Total de KM percorrido.
- 📊 Volume de viagens por categoria.
- 🔧 Próximas manutenções.
- 🏆 Ranking de utilização dos veículos.
- 💰 Projeção financeira.
- 📈 Evolução de KM por dia.
- ⚠️ Quantidade de manutenções pendentes.

O dashboard utiliza um DTO agregado, reduzindo a quantidade de chamadas realizadas pelo frontend.

---

# 🗄️ Repository

Camada responsável pelo acesso aos dados utilizando **Spring Data JPA**.

Além dos métodos padrões de CRUD, foram utilizadas consultas SQL nativas para operações analíticas.

As consultas utilizam recursos como:

```sql
SUM
COUNT
GROUP BY
ORDER BY
COALESCE
EXTRACT
```

## Exemplos de operações:

- Cálculo da quilometragem total da frota.
- Ranking dos veículos mais utilizados.
- Soma dos custos previstos de manutenção.

---

# ⚡ Projections

As consultas analíticas utilizam **Spring Data Projections** para retornar somente os dados necessários.

Em vez de carregar uma entidade completa:

```text
Veiculo
 ├── viagens
 └── manutencoes
```

A aplicação retorna apenas os campos necessários:

```text
RankingUtilizacaoProjection
 ├── placa
 ├── modelo
 └── kmTotal
```

## Benefícios:

- ⚡ Menor quantidade de dados trafegados.
- 📉 Melhor desempenho em consultas específicas.
- 🔄 Separação entre modelo de persistência e resposta da API.

---

# 📦 DTOs

A aplicação utiliza DTOs para comunicação entre backend e frontend.

## Objetivos:

- 🔒 Evitar exposição direta das entidades JPA.
- 📑 Controlar o contrato da API.
- 🔗 Separar o modelo de banco do modelo de apresentação.

## Exemplos:

```text
ViagemResponseDTO
DashboardResponseDTO
DetalhesVeiculoDTO
RankingUtilizacaoDTO
```

---

# 🔄 Mappers

Os mappers são utilizados para realizar conversões entre objetos.

Exemplo:

```text
ViagemRequestDTO
      |
      ↓
Viagem Entity
      |
      ↓
ViagemResponseDTO
```

Essa abordagem evita espalhar lógica de conversão dentro dos controllers e services.

---

# ⚛️ Arquitetura Frontend

O frontend foi desenvolvido utilizando **React com TypeScript** e organizado através de uma arquitetura baseada em funcionalidades (**Feature-Based Architecture**).

Estrutura principal:

```text
src
|
├── components
|
├── features
|   ├── dashboard
|   ├── veiculos
|   ├── viagens
|   └── manutencoes
|
├── lib
|
└── router.tsx
```

---

# 🧩 Organização por Features

Cada domínio possui seus próprios componentes, serviços, hooks e páginas.

Exemplo:

```text
features/
|
└── viagens
    |
    ├── components
    ├── hooks
    ├── pages
    ├── services
    └── types
```

## Benefícios:

- 📁 Melhor localização do código.
- 🔧 Facilidade de manutenção.
- 🚀 Evolução mais simples de funcionalidades.
- 🔗 Redução de dependências entre módulos.

---

# 🔄 Fluxo de Comunicação Frontend → Backend

O fluxo de comunicação segue:

```text
Página React
    |
    ↓
Hook customizado
    |
    ↓
Service da Feature
    |
    ↓
  Axios
    |
    ↓
API REST Spring Boot
    |
    ↓
PostgreSQL
```

---

## Exemplo: Fluxo do Dashboard

```text
DashboardPage
      |
      ↓
useDashboard()
      |
      ↓
dashboard.service.ts
      |
      ↓
GET /dashboard
      |
      ↓
DashboardController
      |
      ↓
DashboardService
      |
      ↓
DashboardRepository
```

---

# 🌐 Cliente HTTP

As chamadas HTTP são centralizadas utilizando uma instância configurada do Axios.

## Configurações:

- URL base através de variável de ambiente.
- Timeout configurado.
- Headers padronizados.

Exemplo:

```env
VITE_API_URL=http://localhost:8080
```

Essa abordagem permite alterar ambientes sem modificar o código da aplicação.

---

# 📊 Gerenciamento de Dados

O gerenciamento das requisições assíncronas foi realizado utilizando:

```text
TanStack React Query
```

## Principais recursos:

- 💾 Cache das consultas.
- 🔄 Controle de atualização dos dados.
- 🔁 Retry automático em falhas.
- ⚡ Redução de chamadas desnecessárias ao backend.

Fluxo:

```text
Componente
  |
  ↓
React Query Hook
  |
  ↓
Service
  |
  ↓
Axios
  |
  ↓
 API
```

---

# 🧭 Roteamento

O controle das páginas é realizado utilizando **React Router**.

## Rotas disponíveis:

| Rota          | Página                           |
| ------------- | -------------------------------- |
| `/dashboard`  | 📊 Dashboard analítico           |
| `/veiculos`   | 🚘 Lista e detalhes dos veículos |
| `/viagens`    | 🛣️ Gerenciamento de viagens      |
| `/manutencao` | 🔧 Consulta de manutenções       |

Rotas inválidas são direcionadas automaticamente para o dashboard.

---

# 🐳 Infraestrutura

A aplicação utiliza Docker para padronizar o ambiente de execução.

Serviços:

```text
Docker Compose
├── PostgreSQL
├── Backend Spring Boot
└── Frontend React
```

O banco de dados utiliza migrations através do **Flyway**, garantindo:

- 📚 Versionamento das alterações.
- 🔄 Controle da evolução estrutural.
- 🌎 Reprodutibilidade do ambiente.

---

# 📌 Resumo da Arquitetura

```text
                 React + TypeScript
                         |
                         |
                    Axios HTTP
                         |
                         |
                Spring Boot REST API
                         |
        --------------------------------
        |                |             |
    Controller        Service     Repository
                                       |
                                       |
                              PostgreSQL + Flyway
```

---

# ✅ Considerações Finais

A arquitetura adotada permite que novas funcionalidades sejam adicionadas mantendo:

- Organização do código.
- Separação de responsabilidades.
- Facilidade de manutenção.
- Evolução segura do sistema.

A estrutura escolhida proporciona uma base preparada para crescimento futuro da aplicação.
