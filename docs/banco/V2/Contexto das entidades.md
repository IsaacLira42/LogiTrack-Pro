## Entidades do Projeto

---

### Manutencao.java

```java
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
```

---

### Veiculo.java

```java
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
```

---

### Viagem

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "viagens")
public class    Viagem {
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
```
