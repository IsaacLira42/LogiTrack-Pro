package br.com.isaaclira.logitrackpro.model;

import br.com.isaaclira.logitrackpro.model.enums.StatusManutencao;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "manutencoes")
public class Manutencao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // No script inicial, veiculo_id permitia valores nulos.
    // Decidi tornar esse relacionamento obrigatório porque uma
    // manutenção sempre deve estar associada a um veículo específico.
    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @NotNull
    @Column(nullable = false, name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_finalizacao")
    private LocalDate dataFinalizacao;

    // No script inicial, tipo_servico permitia valores nulos.
    // Decidi tornar obrigatório porque essa informação é necessária
    // para identificar o serviço realizado na manutenção.
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100, name = "tipo_servico")
    private String tipoServico;

    // O custo foi tornado obrigatório porque essa informação
    // é utilizada na projeção financeira do dashboard.
    @NotNull
    @PositiveOrZero
    @Column(nullable = false, precision = 10, scale = 2, name = "custo_estimado")
    private BigDecimal custoEstimado;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusManutencao status = StatusManutencao.PENDENTE;
}
