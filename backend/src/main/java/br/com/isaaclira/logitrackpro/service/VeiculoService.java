package br.com.isaaclira.logitrackpro.service;

import br.com.isaaclira.logitrackpro.dto.response.VeiculoResponseDTO;
import br.com.isaaclira.logitrackpro.mapper.VeiculoMapper;
import br.com.isaaclira.logitrackpro.model.Veiculo;
import br.com.isaaclira.logitrackpro.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VeiculoService {

    private final VeiculoRepository  veiculoRepository;
    private final VeiculoMapper veiculoMapper;

    // BUSCAR TODOS OS VEÍCULOS
    public List<VeiculoResponseDTO> buscarVeiculos() {
        return veiculoRepository.findAll()
                .stream()
                .map(veiculoMapper::toResponseDTO)
                .toList();
    }

    // BUSCAR POR ID
    public VeiculoResponseDTO buscarPorId(Long id){
        Veiculo veiculo = buscarVeiculoPorId(id);

        return veiculoMapper.toResponseDTO(veiculo);
    }


    // METODOS AUXILIARES
    private Veiculo buscarVeiculoPorId(Long id){
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veiculo com o id" + id + " não encontrado")
        );
    }
}
