package br.com.isaaclira.logitrackpro.controller;

import br.com.isaaclira.logitrackpro.dto.request.ViagemRequestDTO;
import br.com.isaaclira.logitrackpro.dto.response.ViagemResponseDTO;
import br.com.isaaclira.logitrackpro.service.ViagemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/viagens")
@RequiredArgsConstructor
public class ViagemController {
    private final ViagemService viagemService;

    @GetMapping
    public ResponseEntity<List<ViagemResponseDTO>> buscarViagens() {
        return ResponseEntity.ok(viagemService.buscarViagens());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViagemResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(viagemService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ViagemResponseDTO> cadastrar(@Valid @RequestBody ViagemRequestDTO request) {
        ViagemResponseDTO response =  viagemService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ViagemResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody ViagemRequestDTO request
    ) {
        return ResponseEntity.ok(viagemService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(
            @PathVariable Long id
    ) {
        viagemService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
