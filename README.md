# LogiTrack Pro

Sistema web para gerenciamento de frota logística e análise operacional, desenvolvido como MVP para centralizar informações de veículos, viagens e manutenções, permitindo acompanhamento da utilização da frota através de um dashboard analítico.

## Deploy

Frontend: https://logitrack-pro-lyart.vercel.app/  
Backend API: https://logitrack-pro-1sp1.onrender.com/

---

## Demonstração da Aplicação

### Dashboard

Visão geral dos indicadores da frota:

![Dashboard](./docs/imagens/dashboard.png)

---

### Gestão de Veículos

Listagem dos veículos cadastrados:

![Veículos](./docs/imagens/veiculos.png)

Detalhamento individual do veículo com indicadores e gráficos:

![Detalhes do Veículo](./docs/imagens/veiculos-modal.png)

---

### Gestão de Viagens

Listagem das viagens realizadas:

![Viagens](./docs/imagens/viagens.png)

Cadastro de uma nova viagem:

![Cadastro de Viagem](./docs/imagens/viagens-modal_criar_viagem.png)

---

### Gestão de Manutenções

Consulta das manutenções cadastradas:

![Manutenções](./docs/imagens/manutencao.png)

---

# Objetivo

O projeto foi desenvolvido com o objetivo de substituir controles descentralizados em planilhas por uma aplicação web capaz de registrar operações da frota e fornecer informações estratégicas para gestores através de indicadores e consultas analíticas.

O sistema permite o gerenciamento de viagens, consulta de veículos, acompanhamento de manutenções e visualização de métricas operacionais.

---

## Planejamento do Desenvolvimento

O desenvolvimento do projeto foi organizado utilizando GitHub Projects, com as funcionalidades descritas como histórias de usuário e acompanhadas através de um fluxo Kanban.

O quadro contém:

- Histórias de usuário.
- Organização das tarefas por etapa.
- Acompanhamento do progresso.
- Controle das funcionalidades concluídas.

Acesse o quadro: [Kanban do Projeto - GitHub Projects](https://github.com/users/IsaacLira42/projects/6)

---

## Documentação

Além do código-fonte, o projeto possui documentação complementar com detalhes sobre arquitetura, decisões técnicas e modelagem do sistema.

- [Arquitetura do Sistema](./docs/arquitetura.md): Explica a organização do backend, frontend, fluxo de comunicação e responsabilidades das camadas.
- [Decisões Técnicas](./docs/decisoes-tecnicas.md): Documenta as principais escolhas realizadas durante o desenvolvimento, incluindo modelagem do banco, uso de DTOs, Projections, SQL nativo e estratégias adotadas.
- [Modelo de Banco de Dados](./docs/banco/V2/): Contém o DER atualizado, scripts de criação e documentação das alterações realizadas em relação ao banco inicial.
- [Histórias de Usuário](./docs/user-stories.md): Apresenta as funcionalidades do sistema descritas sob a perspectiva dos usuários.

---

# Funcionalidades

## Gestão de viagens

- Cadastro de viagens.
- Atualização de registros.
- Exclusão de viagens.
- Listagem de viagens cadastradas.
- Filtros por:
  - Placa do veículo.
  - Origem.
  - Destino.

---

## Gestão de veículos

- Listagem dos veículos cadastrados.
- Visualização detalhada do veículo.
- Indicadores individuais:
  - Quantidade de viagens realizadas.
  - Quilometragem acumulada.
  - Custos de manutenção.
  - Custo médio por quilômetro.
- Gráficos:
  - Evolução mensal de quilometragem.
  - Custo médio de manutenção.

---

## Gestão de manutenções

- Visualização das manutenções cadastradas.
- Consulta dos serviços realizados e custos associados.

---

# Dashboard Analítico

O dashboard apresenta indicadores extraídos diretamente do banco de dados:

- Total de KM percorrido pela frota.
- Volume de viagens por categoria de veículo (Leve/Pesado).
- Próximas manutenções agendadas.
- Ranking de utilização dos veículos.
- Projeção financeira de manutenção.
- Manutenções pendentes.
- Evolução de quilometragem por dia.

As métricas analíticas utilizam consultas SQL específicas para operações de agregação e análise dos dados.

---

# Tecnologias utilizadas

## Backend

- Java 25.
- Spring Boot 4.0.7.
- Spring Data JPA.
- PostgreSQL.
- Flyway.
- Maven.

## Frontend

- React 19.2.7.
- TypeScript 6.0.2.
- Vite 8.1.1.
- Tailwind CSS 4.3.3.
- TanStack React Query.
- Axios.
- React Hook Form.
- Zod.
- Recharts.
- React Router.

## Infraestrutura

- Docker.
- Docker Compose.
- PostgreSQL 17.

---

# Arquitetura

O backend segue uma arquitetura em camadas:

```
Controller
    |
Service
    |
Repository
    |
Database
```

Principais responsabilidades:

- **Controller:** exposição dos endpoints REST.
- **Service:** regras de negócio e orquestração.
- **Repository:** acesso aos dados.
- **DTOs:** transferência controlada de informações.
- **Mapper:** conversão entre entidades e objetos de resposta.
- **Projection:** retorno otimizado de consultas analíticas.

---

O frontend foi organizado utilizando separação por funcionalidades:

```
features/
├── dashboard
├── viagens
├── veiculos
└── manutencoes
```

Cada módulo possui seus próprios componentes, hooks, serviços e tipos.

---

# Estrutura do projeto

```
LogiTrack-Pro
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   ├── model
│   └── projection
│
├── frontend
│   ├── components
│   ├── features
│   ├── hooks
│   └── services
│
├── docs
│
└── docker-compose.yml
```

---

# Banco de Dados

O banco utilizado foi PostgreSQL.
O gerenciamento do schema é realizado através do Flyway, mantendo o versionamento das alterações do banco.

A aplicação utiliza:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

Dessa forma, o Hibernate apenas valida o modelo existente, enquanto as alterações estruturais são controladas pelas migrations.
As alterações realizadas no modelo inicial do banco estão documentadas em:

```
docs/banco/V2
```

---

# Como executar localmente

## Pré-requisitos

- Docker.
- Docker Compose.

## Executar aplicação completa

Na raiz do projeto:

```bash
docker compose up --build
```

Serviços iniciados:
Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8080
```

Banco:

```
PostgreSQL
localhost:5432
```

---

## Documentação da API

A API possui documentação interativa utilizando Swagger/OpenAPI.

### Ambiente local

Após iniciar o backend, acesse:
http://localhost:8080/swagger-ui/index.html

---

# Decisões técnicas

Algumas decisões tomadas durante o desenvolvimento:

## Escolha do módulo de viagens

O módulo de viagens foi escolhido como principal CRUD porque possui relação direta com grande parte das métricas solicitadas no dashboard.

## Uso de DTOs

As entidades JPA não são expostas diretamente pela API. DTOs foram utilizados para controlar os dados enviados e recebidos.

## Uso de SQL nas métricas

Consultas analíticas foram implementadas utilizando SQL específico para operações como:

- SUM.
- COUNT.
- GROUP BY.
- Ordenações e agregações.

## Uso de Enum

Campos como tipo de veículo e status de manutenção utilizam enums para evitar inconsistências nos valores armazenados.

---

# Documentação adicional

Documentos complementares:

```
docs/
├── banco
├── arquitetura.md
├── decisoes-tecnicas.md
└── user-stories.md
```

Incluindo:

- Modelo de dados.
- Alterações realizadas no banco.
- Histórias de usuário.

---

# Melhorias futuras

Possíveis evoluções:

- Autenticação e autorização de usuários.
- Controle de permissões por perfil.
- Testes automatizados.
- Paginação avançada.
- Relatórios exportáveis.
