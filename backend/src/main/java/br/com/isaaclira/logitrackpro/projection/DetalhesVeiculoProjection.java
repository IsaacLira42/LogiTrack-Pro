package br.com.isaaclira.logitrackpro.projection;

import java.math.BigDecimal;

public interface DetalhesVeiculoProjection {
  String getModelo();
  String getPlaca();
  String getTipo();
  Long getTotalViagens();
  BigDecimal getTotalKm();
  BigDecimal getCustoManutencao();
  BigDecimal getCustoPorKm();
}