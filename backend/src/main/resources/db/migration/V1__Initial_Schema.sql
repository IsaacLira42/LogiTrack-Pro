-- ===========================================
-- V1__Initial_Schema.sql
-- Projeto: LogiTrack Pro
-- Descrição:
-- Criação do esquema inicial do banco de dados
-- e carga dos dados de exemplo fornecidos no desafio.
-- ===========================================


-- ==========================
-- Tabela: veiculos
-- ==========================

CREATE TABLE veiculos (
    id BIGSERIAL PRIMARY KEY,
    placa VARCHAR(10) NOT NULL UNIQUE,
    modelo VARCHAR(50) NOT NULL,
    tipo VARCHAR(20),
    ano INTEGER,

    CONSTRAINT ck_veiculo_ano
        CHECK (ano IS NULL OR ano >= 1900),

    CONSTRAINT ck_veiculo_tipo
        CHECK (tipo IS NULL OR tipo IN ('LEVE', 'PESADO'))
);


-- ==========================
-- Tabela: viagens
-- ==========================

CREATE TABLE viagens (
    id BIGSERIAL PRIMARY KEY,
    veiculo_id BIGINT NOT NULL,
    data_saida TIMESTAMP NOT NULL,
    data_chegada TIMESTAMP,
    origem VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    km_percorrida NUMERIC(10,2) NOT NULL,
    CONSTRAINT fk_viagem_veiculo
     FOREIGN KEY (veiculo_id)
         REFERENCES veiculos(id),

    CONSTRAINT ck_viagem_km
        CHECK (km_percorrida > 0),

    CONSTRAINT ck_viagem_datas
        CHECK (
            data_chegada IS NULL
                OR data_chegada > data_saida
        )
);


-- ==========================
-- Tabela: manutencoes
-- ==========================

CREATE TABLE manutencoes (
    id BIGSERIAL PRIMARY KEY,
    veiculo_id BIGINT NOT NULL,
    data_inicio DATE NOT NULL,
    data_finalizacao DATE,
    tipo_servico VARCHAR(100) NOT NULL,
    custo_estimado NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
    CONSTRAINT fk_manutencao_veiculo
        FOREIGN KEY (veiculo_id)
            REFERENCES veiculos(id),

    CONSTRAINT ck_manutencao_status
        CHECK (status IN ('PENDENTE', 'EM_REALIZACAO', 'CONCLUIDA')),

    CONSTRAINT ck_manutencao_custo
        CHECK (custo_estimado >= 0),

    CONSTRAINT ck_manutencao_datas
     CHECK (
         data_finalizacao IS NULL
             OR data_finalizacao >= data_inicio)
);


-- ===========================================
-- Dados iniciais
-- ===========================================

INSERT INTO veiculos (placa, modelo, tipo, ano)
VALUES
    ('ABC-1234', 'Fiorino', 'LEVE', 2022),
    ('XYZ-9876', 'Volvo FH', 'PESADO', 2021),
    ('KJG-1122', 'Mercedes Sprinter', 'LEVE', 2020),
    ('LMN-4455', 'Scania R500', 'PESADO', 2023);


INSERT INTO viagens (
    veiculo_id,
    data_saida,
    data_chegada,
    origem,
    destino,
    km_percorrida
)
VALUES
    (1,
     '2024-05-01 08:00:00',
     '2024-05-01 18:00:00',
     'São Paulo',
     'Rio de Janeiro',
     435.00),

    (1,
     '2024-05-05 09:00:00',
     '2024-05-05 12:00:00',
     'Rio de Janeiro',
     'Niterói',
     20.50),

    (2,
     '2024-05-02 05:00:00',
     '2024-05-03 20:00:00',
     'Curitiba',
     'Belo Horizonte',
     1000.00);


INSERT INTO manutencoes (
    veiculo_id,
    data_inicio,
    data_finalizacao,
    tipo_servico,
    custo_estimado,
    status
)
VALUES
    (1,
     '2024-06-10',
     '2024-06-11',
     'Troca de Óleo',
     350.00,
     'PENDENTE'),

    (2,
     '2024-06-15',
     '2024-06-17',
     'Revisão de Freios',
     1500.00,
     'PENDENTE'),

    (3,
     '2024-05-20',
     '2024-05-20',
     'Troca de Pneus',
     2200.00,
     'CONCLUIDA');