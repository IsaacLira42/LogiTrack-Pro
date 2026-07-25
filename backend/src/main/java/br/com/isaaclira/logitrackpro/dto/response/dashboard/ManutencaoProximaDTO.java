package br.com.isaaclira.logitrackpro.dto.response.dashboard;

import br.com.isaaclira.logitrackpro.model.enums.StatusManutencao;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ManutencaoProximaDTO(
    Long id,
    String placa,
    String modelo,
    String tipoServico,
    LocalDate dataInicio,
    StatusManutencao status,
    BigDecimal custoEstimado
) {
}
