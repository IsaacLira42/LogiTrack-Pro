package br.com.isaaclira.logitrackpro.service;

import br.com.isaaclira.logitrackpro.dto.response.DadosMensaisDTO;
import br.com.isaaclira.logitrackpro.dto.response.DetalhesVeiculoDTO;
import br.com.isaaclira.logitrackpro.dto.response.VeiculoResponseDTO;
import br.com.isaaclira.logitrackpro.mapper.VeiculoMapper;
import br.com.isaaclira.logitrackpro.model.Veiculo;
import br.com.isaaclira.logitrackpro.projection.DadosMensaisProjection;
import br.com.isaaclira.logitrackpro.projection.DetalhesVeiculoProjection;
import br.com.isaaclira.logitrackpro.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


    public DetalhesVeiculoDTO buscarDetalhes(Long id) {

        DetalhesVeiculoProjection dados = veiculoRepository
                .buscarDetalhes(id);

        if (dados == null) {
            throw new RuntimeException("Veículo não encontrado");
        }

        List<DadosMensaisDTO> kmMensal = veiculoRepository
                .buscarKmMensal(id)
                .stream()
                .map(this::converterDadosMensais)
                .toList();


        List<DadosMensaisDTO> manutencaoMensal = veiculoRepository
                .buscarManutencaoMensal(id)
                .stream()
                .map(this::converterDadosMensais)
                .toList();


        return new DetalhesVeiculoDTO(
                dados.getModelo(),
                dados.getPlaca(),
                dados.getTipo(),
                dados.getTotalViagens(),
                dados.getTotalKm(),
                dados.getCustoManutencao(),
                dados.getCustoPorKm(),
                kmMensal,
                manutencaoMensal
        );
    }


    private DadosMensaisDTO converterDadosMensais(
            DadosMensaisProjection projection
    ) {
        return new DadosMensaisDTO(
                projection.getMes(),
                projection.getValor()
        );
    }


    // METODOS AUXILIARES
    private Veiculo buscarVeiculoPorId(Long id){
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veiculo com o id" + id + " não encontrado")
        );
    }
}
