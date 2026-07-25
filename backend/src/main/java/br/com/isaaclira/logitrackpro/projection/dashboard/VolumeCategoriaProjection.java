package br.com.isaaclira.logitrackpro.projection.dashboard;

import br.com.isaaclira.logitrackpro.model.enums.TipoVeiculo;

public interface VolumeCategoriaProjection {
    TipoVeiculo getTipo();
    Long getQuantidade();
}
