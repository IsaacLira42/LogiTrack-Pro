package br.com.isaaclira.logitrackpro.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ViagemRequestDTO(
        @NotNull(message = "O veículo é obrigatório")
        Long veiculoId,

        @NotNull(message = "A data de saída é obrigatória")
        LocalDateTime dataSaida,

        LocalDateTime dataChegada,

        @NotBlank(message = "A origem é obrigatória")
        @Size(max = 100, message = "A origem deve ter no máximo 100 caracteres")
        String origem,

        @NotBlank(message = "O destino é obrigatório")
        @Size(max = 100, message = "O destino deve ter no máximo 100 caracteres")
        String destino,

        @NotNull(message = "A quilometragem percorrida é obrigatória")
        @Positive(message = "A quilometragem deve ser maior que zero")
        BigDecimal kmPercorrida

) {}
