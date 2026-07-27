package br.com.isaaclira.logitrackpro.repository;

import br.com.isaaclira.logitrackpro.model.Viagem;
import br.com.isaaclira.logitrackpro.projection.dashboard.KmPorDiaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ViagemRepository extends JpaRepository<Viagem, Long> {

    @Query(value = """
        select
            vi.data_saida::date AS dataSaida,
            sum(vi.km_percorrida) AS kmTotal
        from viagens vi
        group by vi.data_saida::date
        order by vi.data_saida::date
    """, nativeQuery = true)
    List<KmPorDiaProjection> buscarKmPorDia();


    @Query(value = """
        SELECT vi.*
        FROM viagens vi
        JOIN veiculos ve ON ve.id = vi.veiculo_id
        WHERE 
            (NULLIF(:placa, '') IS NULL OR ve.placa = :placa)
        AND (NULLIF(:origem, '') IS NULL OR vi.origem ILIKE CONCAT('%', :origem, '%'))
        AND (NULLIF(:destino, '') IS NULL OR vi.destino ILIKE CONCAT('%', :destino, '%'))
    """, nativeQuery = true)
    List<Viagem> buscarViagensComFiltros(
            @Param("placa") String placa,
            @Param("origem") String origem,
            @Param("destino") String destino
    );
}
