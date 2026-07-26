package br.com.isaaclira.logitrackpro.repository;

import br.com.isaaclira.logitrackpro.model.Viagem;
import br.com.isaaclira.logitrackpro.projection.dashboard.KmPorDiaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
}
