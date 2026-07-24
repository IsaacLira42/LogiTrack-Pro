package br.com.isaaclira.logitrackpro.mapper;

import br.com.isaaclira.logitrackpro.dto.request.ViagemRequestDTO;
import br.com.isaaclira.logitrackpro.dto.response.ViagemResponseDTO;
import br.com.isaaclira.logitrackpro.model.Viagem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = VeiculoMapper.class)
public interface ViagemMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "veiculo", ignore = true)
    Viagem toEntity(ViagemRequestDTO dto);
    ViagemResponseDTO toResponseDTO(Viagem viagem);
}