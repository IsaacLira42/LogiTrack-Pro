package br.com.isaaclira.logitrackpro.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ViagemResponseDTO(
        Long id,
        Long veiculoId,
        String placa,
        LocalDateTime dataSaida,
        LocalDateTime dataChegada,
        String origem,
        String destino,
        BigDecimal kmPercorrida
){}