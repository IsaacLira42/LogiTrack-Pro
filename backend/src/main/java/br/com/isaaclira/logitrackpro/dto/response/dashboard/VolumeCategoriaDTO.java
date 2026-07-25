package br.com.isaaclira.logitrackpro.dto.response.dashboard;

import br.com.isaaclira.logitrackpro.model.enums.TipoVeiculo;

public record VolumeCategoriaDTO(
        TipoVeiculo tipo,
        Long quantidade
) {
}
