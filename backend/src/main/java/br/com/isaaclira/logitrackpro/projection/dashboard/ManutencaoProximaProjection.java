package br.com.isaaclira.logitrackpro.projection.dashboard;

import br.com.isaaclira.logitrackpro.model.enums.StatusManutencao;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface ManutencaoProximaProjection {
    Long getId();
    String getPlaca();
    String getModelo();
    String getTipoServico();
    LocalDate getDataInicio();
    StatusManutencao getStatus();
    BigDecimal getCustoEstimado();
}
