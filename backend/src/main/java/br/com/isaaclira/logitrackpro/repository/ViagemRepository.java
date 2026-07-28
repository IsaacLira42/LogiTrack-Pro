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
        select vi.*
        from viagens vi
        join veiculos ve on ve.id = vi.veiculo_id
        where (nullif(:placa, '') is null or ve.placa = :placa)
        and (nullif(:origem, '') is null or vi.origem ilike concat('%', :origem, '%'))
        and (nullif(:destino, '') is null or vi.destino ilike concat('%', :destino, '%'))
        order by vi.data_saida desc
    """, nativeQuery = true)
    List<Viagem> buscarViagensComFiltros(
            @Param("placa") String placa,
            @Param("origem") String origem,
            @Param("destino") String destino
    );
}
