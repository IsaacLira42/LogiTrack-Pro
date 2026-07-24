package br.com.isaaclira.logitrackpro.model;

import br.com.isaaclira.logitrackpro.model.enums.StatusManutencao;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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

    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @Column(nullable = false, name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_finalizacao")
    private LocalDate dataFinalizacao;

    @Size(max = 100)
    @Column(length = 100, name = "tipo_servico")
    private String tipoServico;

    @Column(precision = 10, scale = 2, name = "custo_estimado")
    private BigDecimal custoEstimado;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusManutencao status = StatusManutencao.PENDENTE;
}
