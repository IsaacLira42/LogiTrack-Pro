package br.com.isaaclira.logitrackpro.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "viagens")
public class Viagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // No script inicial, veiculo_id não possuaa a restrição NOT NULL.
    // Decidi tornar esse relacionamento obrigatório porque uma viagem
    // sem veículo não tem, a meu ver, sentido em uma operação logistica.
    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @NotNull
    @Column(nullable = false, name = "data_saida")
    private LocalDateTime dataSaida;

    @Column(name = "data_chegada")
    private LocalDateTime dataChegada;

    // No script inicial, origem e destino permitiam valores nulos.
    // Como representam o trajeto realizado pela viagem, decidi tornar
    // esses campos obrigatorios para evitar registros incompletos.
    @NotBlank
    @Column(nullable = false, length = 100)
    private String origem;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String destino;

    // No script inicial, km_percorrida permitia valores nulos.
    // Como essa informação é utilizada nos cálculos do dashboard,
    // decidi tornar o campo obrigatorio e garantir que o valor seja positivo.
    @NotNull
    @Positive
    @Column(nullable = false, precision = 10, scale = 2, name = "km_percorrida")
    private BigDecimal kmPercorrida;
}
