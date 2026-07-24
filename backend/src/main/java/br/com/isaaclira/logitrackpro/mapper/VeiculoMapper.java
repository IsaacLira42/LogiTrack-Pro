package br.com.isaaclira.logitrackpro.mapper;

import br.com.isaaclira.logitrackpro.dto.response.VeiculoResponseResumoDTO;
import br.com.isaaclira.logitrackpro.model.Veiculo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VeiculoMapper {
    VeiculoResponseResumoDTO toResponseResumoDTO(Veiculo veiculo);
}
