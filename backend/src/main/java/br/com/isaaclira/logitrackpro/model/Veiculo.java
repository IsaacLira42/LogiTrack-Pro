package br.com.isaaclira.logitrackpro.model;

import br.com.isaaclira.logitrackpro.model.enums.TipoVeiculo;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
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

    // Adicionei 1900 como limite minimo porque eu acho que dificilmente
    // uma frota logística teria veiculos mais antigos.
    // A ideia seria evitar valores invalidos no cadastro.
    @Min(1900)
    @Column
    private Integer ano;

    // Apesar de no script original do banco existir um
    // "ON DELETE CASCADE", eu achei que não seria uma boa ideia
    // manter dessa forma porque a exclusão de um veículo não deveria
    // remover automaticamente o histórico de viagens e manutenções.
    @OneToMany(mappedBy = "veiculo")
    private List<Viagem> viagens = new ArrayList<>();

    @OneToMany(mappedBy = "veiculo")
    private List<Manutencao> manutencoes = new ArrayList<>();
}
