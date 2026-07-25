package br.com.isaaclira.logitrackpro.dto.response.dashboard;

import java.math.BigDecimal;

public record RankingUtilizacaoDTO(
    Long id,
    String placa,
    String modelo,
    BigDecimal kmTotal
) {
}
