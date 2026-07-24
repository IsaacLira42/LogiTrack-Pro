package br.com.isaaclira.logitrackpro.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ViagemResponseDTO(
        Long id,
        VeiculoResponseResumoDTO veiculo,
        LocalDateTime dataSaida,
        LocalDateTime dataChegada,
        String origem,
        String destino,
        BigDecimal kmPercorrida
){}