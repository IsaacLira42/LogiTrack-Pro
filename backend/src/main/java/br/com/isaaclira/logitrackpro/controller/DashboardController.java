package br.com.isaaclira.logitrackpro.controller;

import br.com.isaaclira.logitrackpro.dto.response.dashboard.DashboardResponseDTO;
import br.com.isaaclira.logitrackpro.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponseDTO> buscarDashboard(
            @RequestParam(required = false) Long veiculoId) {

        DashboardResponseDTO response =
                dashboardService.buscarDashboard(veiculoId);

        return ResponseEntity.ok(response);
    }
}
