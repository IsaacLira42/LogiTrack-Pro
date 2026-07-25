package br.com.isaaclira.logitrackpro.projection.dashboard;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface ManutencaoProximaProjection {
    Long getId();
    String getPlaca();
    String getModelo();
    String getTipoServico();
    LocalDate getDataInicio();
    String getStatus();
    BigDecimal getCustoEstimado();
}
