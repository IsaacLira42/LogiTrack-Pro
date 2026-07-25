package br.com.isaaclira.logitrackpro.repository;

import br.com.isaaclira.logitrackpro.dto.response.dashboard.VolumeCategoriaDTO;
import br.com.isaaclira.logitrackpro.model.Viagem;
import br.com.isaaclira.logitrackpro.projection.dashboard.VolumeCategoriaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<Viagem, Long> {

    @Query(value = """
        SELECT COALESCE(SUM(v.km_percorrida),0)
        FROM viagens v
    """, nativeQuery = true)
    BigDecimal buscarTotalKm();

    @Query(value = """
        SELECT COALESCE(SUM(v.km_percorrida),0)
        FROM viagens v
        WHERE v.veiculo_id = :veiculoId
    """, nativeQuery = true)
    BigDecimal buscarTotalKmPorVeiculo(
            @Param("veiculoId") Long veiculoId
    );

}
