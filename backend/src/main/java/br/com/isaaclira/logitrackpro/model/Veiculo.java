package br.com.isaaclira.logitrackpro.model;

import br.com.isaaclira.logitrackpro.model.enums.TipoVeiculo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "veiculos")
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 10)
    @Column(nullable = false, unique = true, length = 10)
    private String placa;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String modelo;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private TipoVeiculo tipo;

    private Integer ano;

    @OneToMany(
            mappedBy = "veiculo",
            cascade = CascadeType.REMOVE,
            orphanRemoval = true
    )
    private List<Viagem> viagens = new ArrayList<>();

    @OneToMany(
            mappedBy = "veiculo",
            cascade = CascadeType.REMOVE,
            orphanRemoval = true
    )
    private List<Manutencao> manutencoes = new ArrayList<>();

}
