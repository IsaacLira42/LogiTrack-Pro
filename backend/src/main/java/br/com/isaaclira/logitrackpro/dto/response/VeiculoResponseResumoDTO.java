package br.com.isaaclira.logitrackpro.dto.response;

import br.com.isaaclira.logitrackpro.model.enums.TipoVeiculo;

public record VeiculoResponseResumoDTO(
        Long id,
        String placa,
        String modelo,
        TipoVeiculo tipo
) {
}
