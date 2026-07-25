package br.com.isaaclira.logitrackpro.service;

import br.com.isaaclira.logitrackpro.dto.response.dashboard.DashboardResponseDTO;
import br.com.isaaclira.logitrackpro.dto.response.dashboard.ManutencaoProximaDTO;
import br.com.isaaclira.logitrackpro.dto.response.dashboard.RankingUtilizacaoDTO;
import br.com.isaaclira.logitrackpro.dto.response.dashboard.VolumeCategoriaDTO;
import br.com.isaaclira.logitrackpro.projection.dashboard.ManutencaoProximaProjection;
import br.com.isaaclira.logitrackpro.projection.dashboard.RankingUtilizacaoProjection;
import br.com.isaaclira.logitrackpro.projection.dashboard.VolumeCategoriaProjection;
import br.com.isaaclira.logitrackpro.repository.DashboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final DashboardRepository dashboardRepository;

    // TOTAL KM PERCORRIDO
    public BigDecimal buscarTotalKm() {
        return dashboardRepository.buscarTotalKm();
    }

    public BigDecimal buscarTotalKmPorVeiculo(Long veiculoId) {
        return dashboardRepository.buscarTotalKmPorVeiculo(veiculoId);
    }

    // VOLUME POR CATEGORIA
    public List<VolumeCategoriaDTO> buscarVolumePorCategoria() {
        List<VolumeCategoriaProjection> projections =
                dashboardRepository.buscarVolumePorCategoria();

        return projections.stream()
                .map(projection -> new VolumeCategoriaDTO(
                        projection.getTipo(),
                        projection.getQuantidade()
                )).toList();
    }

    // CRONOGRAMA DE MANUTENCAO
    public List<ManutencaoProximaDTO> buscarProximasManutencoes() {
        List<ManutencaoProximaProjection> projections =
                dashboardRepository.buscarProximasManutencoes();

        return projections.stream()
                .map(projection -> new ManutencaoProximaDTO(
                        projection.getId(),
                        projection.getPlaca(),
                        projection.getModelo(),
                        projection.getTipoServico(),
                        projection.getDataInicio(),
                        projection.getStatus(),
                        projection.getCustoEstimado()
                ))
                .toList();
    }

    // RANKING DE ULTILIZACAO
    public RankingUtilizacaoDTO buscarRankingUtilizacao() {
        RankingUtilizacaoProjection projection =
                dashboardRepository.buscarRankingUtilizacao();

        if (projection == null) {
            return null;
        }

        return new RankingUtilizacaoDTO(
                projection.getId(),
                projection.getPlaca(),
                projection.getModelo(),
                projection.getKmTotal()
        );
    }

    // PROJECAO FINANCEIRA
    public BigDecimal buscarProjecaoFinanceira() {
        return dashboardRepository.buscarProjecaoFinanceira();
    }

    // DASHBOARD AGREGADO
    public DashboardResponseDTO buscarDashboard() {
        return new DashboardResponseDTO(
                buscarTotalKm(),
                buscarVolumePorCategoria(),
                buscarProximasManutencoes(),
                buscarRankingUtilizacao(),
                buscarProjecaoFinanceira()
        );
    }
}