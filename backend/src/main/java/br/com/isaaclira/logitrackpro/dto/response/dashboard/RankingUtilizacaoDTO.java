package br.com.isaaclira.logitrackpro.dto.response.dashboard;

import java.math.BigDecimal;

public record RankingUtilizacaoDTO(
    String modelo,
    String placa,
    BigDecimal kmTotal
) {
}
