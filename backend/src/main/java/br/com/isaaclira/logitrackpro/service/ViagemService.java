package br.com.isaaclira.logitrackpro.service;

import br.com.isaaclira.logitrackpro.dto.request.ViagemRequestDTO;
import br.com.isaaclira.logitrackpro.dto.response.ViagemResponseDTO;
import br.com.isaaclira.logitrackpro.mapper.ViagemMapper;
import br.com.isaaclira.logitrackpro.model.Veiculo;
import br.com.isaaclira.logitrackpro.model.Viagem;
import br.com.isaaclira.logitrackpro.repository.VeiculoRepository;
import br.com.isaaclira.logitrackpro.repository.ViagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ViagemService {
    private final ViagemRepository viagemRepository;
    private final VeiculoRepository veiculoRepository;
    private final ViagemMapper viagemMapper;

    // LIST BY ID
    public ViagemResponseDTO buscarPorId(Long id) {
        Viagem viagem = buscarViagem(id);

        return viagemMapper.toResponseDTO(viagem);
    }

    // CREATE
    @Transactional
    public ViagemResponseDTO cadastrarViagem(ViagemRequestDTO request) {
        validarPeriodo(request.dataSaida(), request.dataChegada());

        Veiculo veiculo = buscarVeiculo(request.veiculoId());

        Viagem viagem = viagemMapper.toEntity(request);

        viagem.setVeiculo(veiculo);

        Viagem viagemSalva = viagemRepository.save(viagem);

        return  viagemMapper.toResponseDTO(viagemSalva);
    }


    // Metodos Auxiliares
    private Veiculo buscarVeiculo(Long id) {
        // TODO: Criar um tratamento de erros global e substituir esse generico
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo com id " + id + " não encontrado"));
    }

    private void validarPeriodo(LocalDateTime dataSaida, LocalDateTime dataChegada) {
        if (dataChegada != null && dataChegada.isBefore(dataSaida)) {
            throw new IllegalArgumentException(
                    "A data de chegada não pode ser anterior à data de saída."
            );
        }
    }

    private Viagem buscarViagem(Long id) {
        // TODO: Subtituir esse tratamento de erros por um global
        return viagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Viagem com id " + id + " não encontrada"));
    }
}