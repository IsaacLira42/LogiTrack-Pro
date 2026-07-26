package br.com.isaaclira.logitrackpro.dto.response.dashboard;

import java.math.BigDecimal;
import java.time.LocalDate;

public record KmPorDiaDTO(
        LocalDate dataSaida,
        BigDecimal kmTotal
) {
}
