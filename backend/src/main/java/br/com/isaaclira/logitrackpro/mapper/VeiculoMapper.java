package br.com.isaaclira.logitrackpro.mapper;

import br.com.isaaclira.logitrackpro.dto.response.VeiculoResponseDTO;
import br.com.isaaclira.logitrackpro.model.Veiculo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VeiculoMapper {
    VeiculoResponseDTO toResponseDTO(Veiculo veiculo);
}
