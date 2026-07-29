package br.com.isaaclira.logitrackpro.repository;

import br.com.isaaclira.logitrackpro.model.Veiculo;
import br.com.isaaclira.logitrackpro.projection.DadosMensaisProjection;
import br.com.isaaclira.logitrackpro.projection.DetalhesVeiculoProjection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    @Query(value = """
        SELECT 
            v.modelo AS modelo,
            v.placa AS placa,
            v.tipo AS tipo,

            (
                SELECT COUNT(*)
                FROM viagens vi
                WHERE vi.veiculo_id = v.id
            ) AS totalViagens,

            (
                SELECT COALESCE(SUM(vi.km_percorrida), 0)
                FROM viagens vi
                WHERE vi.veiculo_id = v.id
            ) AS totalKm,

            (
                SELECT COALESCE(SUM(m.custo_estimado), 0)
                FROM manutencoes m
                WHERE m.veiculo_id = v.id
            ) AS custoManutencao,

            (
                SELECT 
                    COALESCE(
                        SUM(m.custo_estimado) / NULLIF(
                            (
                                SELECT SUM(vi2.km_percorrida)
                                FROM viagens vi2
                                WHERE vi2.veiculo_id = v.id
                            ),
                            0
                        ),
                        0
                    )
                FROM manutencoes m
                WHERE m.veiculo_id = v.id
            ) AS custoPorKm

        FROM veiculos v
        WHERE v.id = :id
        """, nativeQuery = true)
    DetalhesVeiculoProjection buscarDetalhes(@Param("id") Long id);


    @Query(value = """
        SELECT
            TO_CHAR(vi.data_saida, 'Mon') AS mes,
            COALESCE(SUM(vi.km_percorrida), 0) AS valor
        FROM viagens vi
        WHERE vi.veiculo_id = :id
        GROUP BY 
            TO_CHAR(vi.data_saida, 'Mon'),
            DATE_TRUNC('month', vi.data_saida)
        ORDER BY DATE_TRUNC('month', vi.data_saida)
        """, nativeQuery = true)
    List<DadosMensaisProjection> buscarKmMensal(@Param("id") Long id);


    @Query(value = """
        SELECT
            TO_CHAR(m.data_inicio, 'Mon') AS mes,
            COALESCE(SUM(m.custo_estimado), 0) AS valor
        FROM manutencoes m
        WHERE m.veiculo_id = :id
        GROUP BY
            TO_CHAR(m.data_inicio, 'Mon'),
            DATE_TRUNC('month', m.data_inicio)
        ORDER BY DATE_TRUNC('month', m.data_inicio)
        """, nativeQuery = true)
    List<DadosMensaisProjection> buscarManutencaoMensal(@Param("id") Long id);
}