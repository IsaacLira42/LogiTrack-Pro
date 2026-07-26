package br.com.isaaclira.logitrackpro.dto.response;

import br.com.isaaclira.logitrackpro.model.enums.TipoVeiculo;

public record VeiculoResponseDTO(
        Long id,
        String placa,
        String modelo,
        TipoVeiculo tipo,
        Integer ano
) {
}
