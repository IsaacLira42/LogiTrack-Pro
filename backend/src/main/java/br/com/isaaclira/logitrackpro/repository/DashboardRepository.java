package br.com.isaaclira.logitrackpro.repository;

import br.com.isaaclira.logitrackpro.model.Viagem;
import br.com.isaaclira.logitrackpro.projection.dashboard.ManutencaoProximaProjection;
import br.com.isaaclira.logitrackpro.projection.dashboard.RankingUtilizacaoProjection;
import br.com.isaaclira.logitrackpro.projection.dashboard.VolumeCategoriaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<Viagem, Long> {
    // TOTAL KM PERCORRIDO
    @Query(value = """
        select coalesce(sum(v.km_percorrida),0) as totalKm
        from viagens v
    """, nativeQuery = true)
    BigDecimal buscarTotalKm();

    @Query(value = """
        select coalesce(sum(v.km_percorrida),0) as totalKm
        from viagens v
        where v.veiculo_id = :veiculoId
    """, nativeQuery = true)
    BigDecimal buscarTotalKmPorVeiculo(
            @Param("veiculoId") Long veiculoId
    );


    // VOLUME POR CATEGORIA
    @Query(value = """
        select
            ve.tipo as tipo,
            count(vi.id) as quantidade
        from veiculos ve
        left join viagens vi on ve.id = vi.veiculo_id
        group by ve.tipo
    """, nativeQuery = true)
    List<VolumeCategoriaProjection> buscarVolumePorCategoria();


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
        limit 5
    """, nativeQuery = true) List<ManutencaoProximaProjection> buscarProximasManutencoes();


    // RANKING DE ULTILIZACAO
    @Query(value = """
        select
            ve.id as id,
            ve.placa as placa,
            ve.modelo as modelo,
            coalesce(sum(vi.km_percorrida), 0) as kmTotal
        from veiculos ve
        inner join viagens vi on ve.id = vi.veiculo_id
        group by ve.id, ve.placa, ve.modelo
        order by kmTotal desc
        limit 1
    """, nativeQuery = true)
    RankingUtilizacaoProjection buscarRankingUtilizacao();


    // PROJECAO FINANCEIRA
    @Query(value = """
        select
            coalesce(sum(m.custo_estimado), 0) as custoEstimado
        from manutencoes m
        where
            extract(year from m.data_inicio) = extract(year from current_date)
            and extract(month from m.data_inicio) = extract(month from current_date)
            and m.status in ('PENDENTE', 'EM_REALIZACAO')
    """, nativeQuery = true)
    BigDecimal buscarProjecaoFinanceira();


    // MANUTENÇOES PENDENTES
    @Query(value = """
        select
            count(m.id) as quantidade
        from manutencoes m
        where m.status = 'PENDENTE'
    """, nativeQuery = true)
    Integer buscarManutencoesPendentes();
}
