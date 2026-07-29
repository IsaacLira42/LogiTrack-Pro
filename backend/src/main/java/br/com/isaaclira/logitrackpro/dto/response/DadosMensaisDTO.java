package br.com.isaaclira.logitrackpro.dto.response;

import java.math.BigDecimal;

public record DadosMensaisDTO(
        String mes,
        BigDecimal valor
) {}