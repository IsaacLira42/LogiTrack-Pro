package br.com.isaaclira.logitrackpro.projection.dashboard;

import java.math.BigDecimal;

public interface RankingUtilizacaoProjection {
    Long getId();
    String getPlaca();
    String getModelo();
    BigDecimal getKmTotal();
}