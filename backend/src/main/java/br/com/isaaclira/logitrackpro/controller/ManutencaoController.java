package br.com.isaaclira.logitrackpro.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.isaaclira.logitrackpro.dto.response.dashboard.ManutencaoProximaDTO;
import br.com.isaaclira.logitrackpro.service.ManutencaoService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/manutencoes")
@AllArgsConstructor
public class ManutencaoController {
  private final ManutencaoService manutencaoService;

  @GetMapping
  public List<ManutencaoProximaDTO> buscarTodasManutencoes() {
    return manutencaoService.buscarTodasManutencoes();
  }
}
