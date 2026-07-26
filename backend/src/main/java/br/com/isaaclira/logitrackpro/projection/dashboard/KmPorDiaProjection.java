package br.com.isaaclira.logitrackpro.projection.dashboard;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface KmPorDiaProjection {
    LocalDate getDataSaida();
    BigDecimal getKmTotal();
}
