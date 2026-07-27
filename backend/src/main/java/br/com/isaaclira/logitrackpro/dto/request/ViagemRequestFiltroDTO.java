package br.com.isaaclira.logitrackpro.dto.request;

public record ViagemRequestFiltroDTO(
        String placa,
        String origem,
        String destino
) {}