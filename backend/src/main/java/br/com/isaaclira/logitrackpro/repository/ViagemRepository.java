package br.com.isaaclira.logitrackpro.repository;

import br.com.isaaclira.logitrackpro.model.Viagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViagemRepository extends JpaRepository<Viagem, Long> {
}
