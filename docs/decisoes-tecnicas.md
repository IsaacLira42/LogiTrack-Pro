# Decisões Técnicas

## Visão Geral

Durante o desenvolvimento do **LogiTrack Pro**, algumas decisões técnicas foram tomadas buscando melhorar a qualidade do código, garantir integridade dos dados e facilitar a evolução futura da aplicação.

Este documento apresenta as principais escolhas realizadas durante a implementação e as justificativas para cada uma delas.

---

# Escolha da Arquitetura

## Backend em camadas

Foi adotada uma arquitetura baseada em camadas utilizando:

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

### Motivação

A separação das responsabilidades evita que regras de negócio fiquem espalhadas pela aplicação.

Responsabilidades definidas:

| Camada     | Responsabilidade                        |
| ---------- | --------------------------------------- |
| Controller | Exposição dos endpoints REST            |
| Service    | Regras de negócio e fluxo da aplicação  |
| Repository | Acesso e consultas ao banco             |
| Entity     | Representação das entidades persistidas |
| DTO        | Comunicação entre API e frontend        |

Essa organização facilita manutenção, testes e evolução do sistema.

---

# Escolha do módulo de CRUD

O desafio permitia escolher entre:

- Gestão de viagens.
- Gestão de manutenção.

Foi escolhido desenvolver o módulo de **Viagens**.

## Justificativa

A entidade viagem possui maior impacto operacional, pois está diretamente relacionada aos principais indicadores solicitados:

- Quilometragem percorrida.
- Ranking de utilização dos veículos.
- Volume de viagens por categoria.
- Evolução de utilização da frota.

Além disso, a viagem possui relação direta com veículos e permite gerar dados analíticos para o dashboard.

---

# Alterações no modelo de banco de dados

O banco inicial fornecido pelo desafio foi utilizado como base, porém algumas alterações foram realizadas para melhorar a consistência dos dados.

A nova versão do banco está localizada em:

```text
docs/banco/V2
```

---

# Remoção do comportamento ON DELETE CASCADE

## Modelo inicial

A tabela possuía:

```sql
veiculo_id INTEGER REFERENCES veiculos(id) ON DELETE CASCADE
```

## Alteração realizada

O comportamento foi removido.

## Motivo

A exclusão de um veículo não deveria remover automaticamente seu histórico operacional.

Exemplo:

Um veículo pode possuir:

- Viagens realizadas.
- Custos de manutenção.
- Histórico de utilização.

Essas informações possuem valor analítico e devem ser preservadas.

---

# Relacionamentos obrigatórios

Foram adicionadas restrições para garantir que registros dependentes sempre possuam vínculo válido.

Exemplo:

```java
@ManyToOne
@JoinColumn(nullable = false)
private Veiculo veiculo;
```

Aplicado em:

- Viagem.
- Manutenção.

## Motivo

Uma viagem sem veículo associado ou uma manutenção sem veículo relacionado representa um registro inválido dentro do domínio da aplicação.

---

# Campos obrigatórios

Alguns campos inicialmente permitiam valores nulos, porém foram alterados.

Exemplos:

## Viagem

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

## Justificativa

Essas informações são essenciais para:

- Identificar o trajeto realizado.
- Calcular indicadores.
- Alimentar o dashboard.

---

# Validações de domínio

Além das validações estruturais do banco, foram adicionadas regras de negócio.

## Exemplo: período da viagem

Uma viagem não pode possuir data de chegada anterior à saída.

Regra:

```java
dataChegada > dataSaida
```

Caso contrário, o registro é rejeitado.

---

## Exemplo: período da manutenção

Uma manutenção finalizada não pode possuir data anterior ao início.

Regra:

```java
dataFinalizacao >= dataInicio
```

---

# Uso de DTOs

As entidades JPA não são retornadas diretamente pela API.

Foram criados objetos específicos para comunicação:

Exemplos:

```text
ViagemRequestDTO
ViagemResponseDTO
DashboardResponseDTO
DetalhesVeiculoDTO
```

## Motivos

A utilização de DTOs permite:

- Evitar exposição da estrutura interna do banco.
- Controlar os dados retornados pela API.
- Reduzir acoplamento entre frontend e backend.
- Facilitar alterações futuras no modelo.

---

# Uso de Projections

Para consultas analíticas foram utilizadas Spring Data Projections.

Exemplo:

```java
RankingUtilizacaoProjection
```

Em vez de carregar toda a entidade:

```text
Veiculo
 ├── viagens
 └── manutencoes
```

a consulta retorna somente:

```text
placa
modelo
kmTotal
```

## Benefícios

- Menor consumo de memória.
- Menos dados trafegados.
- Consultas mais específicas.
- Melhor desempenho em relatórios.

---

# Uso de SQL Nativo no Dashboard

As métricas do dashboard foram implementadas utilizando consultas SQL nativas.

Exemplos:

- Soma de quilômetros.
- Contagem de viagens.
- Ranking de veículos.
- Projeção financeira.

## Justificativa

Consultas analíticas geralmente envolvem agregações e operações específicas do banco.

O uso de SQL explícito permite:

- Maior controle sobre a consulta.
- Melhor leitura da regra analítica.
- Aproveitamento dos recursos do PostgreSQL.

---

# Versionamento do banco com Flyway

O projeto utiliza Flyway para controle das alterações do banco.

Estrutura:

```text
resources
└── db
    └── migration
        └── V1__Initial_Schema.sql
```

## Motivos

O versionamento evita alterações manuais inconsistentes no banco.

Benefícios:

- Histórico das mudanças.
- Reprodutibilidade do ambiente.
- Facilidade para novos desenvolvedores configurarem o projeto.

---

# Estratégia de validação

As validações foram distribuídas entre diferentes camadas.

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

## Banco de dados

Responsável por garantir integridade estrutural.

Exemplos:

- NOT NULL.
- UNIQUE.
- FOREIGN KEY.

---

# Gerenciamento de estado no Frontend

Foi utilizado:

```text
TanStack React Query
```

## Justificativa

A aplicação possui diversos dados vindos da API, principalmente:

- Dashboard.
- Veículos.
- Viagens.
- Manutenções.

O React Query permite:

- Cache automático.
- Controle de atualização.
- Reaproveitamento dos dados carregados.
- Tratamento de estados de carregamento e erro.

---

# Organização do Frontend por Features

O frontend foi organizado por domínio:

```text
features

├── dashboard
├── veiculos
├── viagens
└── manutencoes
```

## Justificativa

Essa estrutura mantém componentes, serviços e hooks próximos ao contexto em que são utilizados.

Benefícios:

- Código mais organizado.
- Maior facilidade de manutenção.
- Melhor escalabilidade.

---

# Uso de Docker

Foram criados ambientes containerizados utilizando Docker.

Serviços:

- PostgreSQL.
- Backend Spring Boot.
- Frontend React.

## Motivos

O uso de containers permite:

- Padronização do ambiente.
- Facilidade de execução.
- Redução de problemas de configuração.

---

# Deploy

A aplicação foi disponibilizada em ambiente externo:

## Backend

URL:

https://logitrack-pro-1sp1.onrender.com

## Frontend

URL:

https://logitrack-pro-lyart.vercel.app/

O deploy demonstra a preocupação em disponibilizar uma versão funcional da aplicação além do ambiente local.

---

# Considerações finais

As decisões tomadas durante o desenvolvimento tiveram como objetivo construir uma aplicação organizada, com separação clara de responsabilidades, integridade dos dados e estrutura preparada para futuras evoluções.
