package br.com.isaaclira.logitrackpro.service;

import br.com.isaaclira.logitrackpro.dto.request.ViagemRequestDTO;
import br.com.isaaclira.logitrackpro.dto.request.ViagemRequestFiltroDTO;
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
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ViagemService {
    private final ViagemRepository viagemRepository;
    private final VeiculoRepository veiculoRepository;
    private final ViagemMapper viagemMapper;

    // LIST ALL
    public List<ViagemResponseDTO> buscarViagens() {
        List<Viagem> viagens = buscarTodasViagens();

        return viagens.stream()
                .map(viagemMapper::toResponseDTO)
                .toList();
    }

    // LIST FILTROS
    public List<ViagemResponseDTO> buscarViagensComFiltros(
            ViagemRequestFiltroDTO filtro
    ) {

        List<Viagem> viagens = viagemRepository.buscarViagensComFiltros(
            limparFiltro(filtro.placa()),
            limparFiltro(filtro.origem()),
            limparFiltro(filtro.destino())
        );

        return viagens.stream()
                .map(viagemMapper::toResponseDTO)
                .toList();
    }

    // TODO: Mandar pro final do arquivo
    private String limparFiltro(String valor) {
        return valor == null || valor.isBlank()
                ? null
                : valor;
    }

    // LIST BY ID
    public ViagemResponseDTO buscarPorId(Long id) {
        Viagem viagem = buscarViagem(id);

        return viagemMapper.toResponseDTO(viagem);
    }

    // CREATE
    @Transactional
    public ViagemResponseDTO cadastrar(ViagemRequestDTO request) {
        validarPeriodo(request.dataSaida(), request.dataChegada());

        Veiculo veiculo = buscarVeiculo(request.veiculoId());

        Viagem viagem = viagemMapper.toEntity(request);

        viagem.setVeiculo(veiculo);

        Viagem viagemSalva = viagemRepository.save(viagem);

        return  viagemMapper.toResponseDTO(viagemSalva);
    }

    // UPDATE
    @Transactional
    public ViagemResponseDTO atualizar(Long id, ViagemRequestDTO request) {
        validarPeriodo(request.dataSaida(), request.dataChegada());

        Viagem viagem = buscarViagem(id);

        Veiculo veiculo = buscarVeiculo(request.veiculoId());

        viagem.setVeiculo(veiculo);

        viagem.setDataSaida(request.dataSaida());
        viagem.setDataChegada(request.dataChegada());
        viagem.setOrigem(request.origem());
        viagem.setDestino(request.destino());
        viagem.setKmPercorrida(request.kmPercorrida());

        Viagem viagemAtualizada = viagemRepository.save(viagem);

        return viagemMapper.toResponseDTO(viagemAtualizada);
    }

    // DELETE
    @Transactional
    public void remover(Long id) {
        Viagem viagem = buscarViagem(id);

        viagemRepository.delete(viagem);
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

    private List<Viagem> buscarTodasViagens() {
        return viagemRepository.findAll();
    }
}