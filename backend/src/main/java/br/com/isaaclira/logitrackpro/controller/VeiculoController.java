package br.com.isaaclira.logitrackpro.controller;

import br.com.isaaclira.logitrackpro.dto.response.VeiculoResponseDTO;
import br.com.isaaclira.logitrackpro.service.VeiculoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
@RequiredArgsConstructor
public class VeiculoController {
    private final VeiculoService veiculoService;

    @GetMapping
    public ResponseEntity<List<VeiculoResponseDTO>> buscarVeiculos() {
        return ResponseEntity.ok(veiculoService.buscarVeiculos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VeiculoResponseDTO> buscarVeiculoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(veiculoService.buscarPorId(id));
    }
}
