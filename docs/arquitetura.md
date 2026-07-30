# Arquitetura do Sistema

## Visão Geral

O **LogiTrack Pro** foi desenvolvido seguindo uma arquitetura baseada em camadas no backend e uma organização orientada a funcionalidades no frontend.

A aplicação tem como objetivo centralizar informações relacionadas à operação de uma frota logística, permitindo o gerenciamento de viagens, consulta de veículos, acompanhamento de manutenções e análise de indicadores operacionais através de um dashboard.

A arquitetura foi projetada buscando:

- Separação de responsabilidades.
- Facilidade de manutenção.
- Baixo acoplamento entre componentes.
- Organização escalável.
- Controle adequado do fluxo de dados.

---

# Arquitetura Backend

O backend foi desenvolvido utilizando **Spring Boot**, seguindo uma arquitetura em camadas:

```
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

Cada camada possui uma responsabilidade específica dentro da aplicação.

---

## Controller

Responsável pela exposição dos endpoints REST da aplicação.

Principais responsabilidades:

- Receber requisições HTTP.
- Validar dados de entrada.
- Encaminhar chamadas para a camada de serviço.
- Retornar respostas HTTP adequadas.

Exemplos de recursos disponibilizados:

| Recurso     | Endpoint       |
| ----------- | -------------- |
| Dashboard   | `/dashboard`   |
| Veículos    | `/veiculos`    |
| Viagens     | `/viagens`     |
| Manutenções | `/manutencoes` |

---

## Service

A camada de serviço concentra as regras de negócio e a orquestração das operações.

Responsabilidades:

- Executar validações de negócio.
- Coordenar chamadas aos repositories.
- Converter dados entre entidades, projections e DTOs.
- Controlar operações transacionais.

Exemplos:

### ViagemService

Responsável pelo fluxo completo de viagens:

- Cadastro.
- Atualização.
- Exclusão.
- Consulta.
- Aplicação de filtros.

Também realiza validações como:

- Existência do veículo associado.
- Validação do período da viagem.

---

### DashboardService

Responsável por consolidar os dados analíticos da aplicação.

Realiza a composição das métricas:

- Total de KM percorrido.
- Volume por categoria.
- Próximas manutenções.
- Ranking de utilização.
- Projeção financeira.
- Evolução de KM por dia.
- Quantidade de manutenções pendentes.

O dashboard é retornado através de um DTO agregado, reduzindo a quantidade de chamadas realizadas pelo frontend.

---

## Repository

Camada responsável pelo acesso aos dados utilizando Spring Data JPA.

Além dos métodos padrões de CRUD, foram utilizadas consultas SQL nativas para operações analíticas.

As consultas do dashboard utilizam recursos como:

- `SUM`
- `COUNT`
- `GROUP BY`
- `ORDER BY`
- `COALESCE`
- `EXTRACT`

Exemplo:

- Cálculo da quilometragem total da frota.
- Ranking dos veículos mais utilizados.
- Soma dos custos previstos de manutenção.

---

## Projections

As consultas analíticas utilizam Spring Data Projections para retornar somente os dados necessários.

Exemplo:

Ao invés de carregar uma entidade completa:

```
Veiculo
 ├── viagens
 └── manutencoes
```

uma consulta analítica retorna apenas:

```
RankingUtilizacaoProjection
 ├── placa
 ├── modelo
 └── kmTotal
```

Benefícios:

- Menor quantidade de dados trafegados.
- Melhor desempenho em consultas específicas.
- Separação entre modelo de persistência e resposta da API.

---

## DTOs

A aplicação utiliza DTOs para comunicação entre backend e frontend.

Objetivos:

- Evitar exposição direta das entidades JPA.
- Controlar o contrato da API.
- Separar o modelo de banco do modelo de apresentação.

Exemplos:

```
ViagemResponseDTO
DashboardResponseDTO
DetalhesVeiculoDTO
RankingUtilizacaoDTO
```

---

## Mappers

Os mappers são utilizados para realizar conversões entre objetos.

Exemplo:

```
ViagemRequestDTO

        ↓

Viagem Entity

        ↓

ViagemResponseDTO
```

Isso evita espalhar lógica de conversão dentro dos controllers e services.

---

# Arquitetura Frontend

O frontend foi desenvolvido utilizando React com TypeScript e organizado utilizando uma arquitetura baseada em funcionalidades (**feature-based architecture**).

Estrutura principal:

```
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

## Organização por Features

Cada domínio possui seus próprios componentes, serviços, hooks e páginas.

Exemplo:

```
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

Essa abordagem facilita:

- Localização do código.
- Manutenção.
- Evolução de novas funcionalidades.
- Redução de dependências entre módulos.

---

# Fluxo de Comunicação Frontend → Backend

O fluxo de comunicação segue:

```
Página React

    ↓

Hook customizado

    ↓

Service da Feature

    ↓

Axios

    ↓

API REST Spring Boot

    ↓

PostgreSQL
```

Exemplo do fluxo do dashboard:

```
DashboardPage

↓

useDashboard()

↓

dashboard.service.ts

↓

GET /dashboard

↓

DashboardController

↓

DashboardService

↓

DashboardRepository
```

---

# Cliente HTTP

As chamadas HTTP são centralizadas utilizando uma instância configurada do Axios.

Configuração:

- URL base através de variável de ambiente.
- Timeout configurado.
- Headers padronizados.

Exemplo:

```
VITE_API_URL=http://localhost:8080
```

Essa abordagem permite alterar ambientes sem modificar o código da aplicação.

---

# Gerenciamento de Dados

O gerenciamento das requisições assíncronas foi realizado utilizando **TanStack React Query**.

Configurações principais:

- Cache das consultas.
- Controle de atualização dos dados.
- Retry automático em falhas.
- Evita chamadas desnecessárias ao backend.

Fluxo:

```
Componente

↓

React Query Hook

↓

Service

↓

Axios

↓

API
```

---

# Roteamento

O controle das páginas é realizado utilizando React Router.

Rotas disponíveis:

| Rota          | Página                        |
| ------------- | ----------------------------- |
| `/dashboard`  | Dashboard analítico           |
| `/veiculos`   | Lista e detalhes dos veículos |
| `/viagens`    | Gerenciamento de viagens      |
| `/manutencao` | Consulta de manutenções       |

Rotas inválidas são direcionadas automaticamente para o dashboard.

---

# Infraestrutura

A aplicação utiliza Docker para padronizar o ambiente de execução.

Serviços:

```
Docker Compose

├── PostgreSQL
├── Backend Spring Boot
└── Frontend React
```

O banco de dados utiliza migrations através do Flyway, garantindo versionamento e controle das alterações estruturais.

---

# Resumo da Arquitetura

```
                 React + TypeScript
                         |
                         |
                    Axios HTTP
                         |
                         |
                Spring Boot REST API
                         |
        --------------------------------
        |              |               |
    Controller      Service       Repository
                                     |
                                     |
                              PostgreSQL + Flyway
```

A arquitetura adotada permite que novas funcionalidades sejam adicionadas mantendo a separação de responsabilidades e a organização do código.
