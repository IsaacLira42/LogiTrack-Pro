package br.com.isaaclira.logitrackpro.mapper;

import br.com.isaaclira.logitrackpro.dto.request.ViagemRequestDTO;
import br.com.isaaclira.logitrackpro.dto.response.ViagemResponseDTO;
import br.com.isaaclira.logitrackpro.model.Viagem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = VeiculoMapper.class)
public interface ViagemMapper {
    Viagem toEntity(ViagemRequestDTO dto);
    ViagemResponseDTO toResponseDTO(Viagem viagem);
}