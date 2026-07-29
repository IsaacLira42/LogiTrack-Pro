package br.com.isaaclira.logitrackpro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.isaaclira.logitrackpro.model.Manutencao;
import br.com.isaaclira.logitrackpro.projection.dashboard.ManutencaoProximaProjection;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {
  // CRONOGRAMA DE MANUTENCAO
  @Query(value = """
      select
          m.id as id,
          v.placa as placa,
          v.modelo as modelo,
          m.tipo_servico as tipoServico,
          m.data_inicio as dataInicio,
          m.status as status,
          m.custo_estimado as custoEstimado
      from manutencoes m
      inner join veiculos v on m.veiculo_id = v.id
      where m.status in ('PENDENTE', 'EM_REALIZACAO')
      order by m.data_inicio asc
  """, nativeQuery = true) List<ManutencaoProximaProjection> buscarTodasManutencoes();
}
