package br.com.isaaclira.logitrackpro.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record DetalhesVeiculoDTO(
        String modelo,
        String placa,
        String tipo,
        Long totalViagens,
        BigDecimal totalKm,
        BigDecimal custoManutencao,
        BigDecimal custoPorKm,
        List<DadosMensaisDTO> kmMensal,
        List<DadosMensaisDTO> manutencaoMensal
) {}