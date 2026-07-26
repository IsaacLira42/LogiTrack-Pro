package br.com.isaaclira.logitrackpro.dto.response.dashboard;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponseDTO(
    BigDecimal totalKm,
    List<VolumeCategoriaDTO> volumeCategoria,
    List<ManutencaoProximaDTO> proximasManutencoes,
    RankingUtilizacaoDTO ranking,
    BigDecimal projecaoFinanceira,
    List<KmPorDiaDTO> kmPorDia,
    Integer manutencoesPendentes
) {
}
