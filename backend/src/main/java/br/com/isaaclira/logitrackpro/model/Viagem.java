package br.com.isaaclira.logitrackpro.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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

    @ManyToOne
    // No SQL do teste, esse campo não é obrigatorio,
    // mas decidi deixa-lo obrigatorio porque acho que faz
    // mais sentido
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @Column(nullable = false, name = "data_saida")
    private LocalDateTime dataSaida;

    @Column(name = "data_chegada")
    private LocalDateTime dataChegada;

    @Column(length = 100)
    private String origem;

    @Column(length = 100)
    private String destino;

    @Column(precision = 10, scale = 2, name = "km_percorrida")
    private BigDecimal kmPercorrida;
}
