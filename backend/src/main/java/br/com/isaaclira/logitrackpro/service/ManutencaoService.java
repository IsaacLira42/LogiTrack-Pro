package br.com.isaaclira.logitrackpro.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.isaaclira.logitrackpro.dto.response.dashboard.ManutencaoProximaDTO;
import br.com.isaaclira.logitrackpro.projection.dashboard.ManutencaoProximaProjection;
import br.com.isaaclira.logitrackpro.repository.ManutencaoRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ManutencaoService {
  private final ManutencaoRepository manutencaoRepository;

  public List<ManutencaoProximaDTO> buscarTodasManutencoes() {
    List<ManutencaoProximaProjection> manutencoes = manutencaoRepository.buscarTodasManutencoes();

    return manutencoes.stream()
    .map(
      (manutencao) -> new ManutencaoProximaDTO(
        manutencao.getId(),
        manutencao.getPlaca(),
        manutencao.getModelo(),
        manutencao.getTipoServico(),
        manutencao.getDataInicio(),
        manutencao.getStatus(),
        manutencao.getCustoEstimado()
      )
    ).toList();
  }
}
