package br.com.isaaclira.logitrackpro.dto.response.dashboard;

import java.time.LocalDate;

public record ManutencaoProximaDTO(
    String placa,
    String modelo,
    String tipoServico,
    LocalDate dataInicio
) {
}
