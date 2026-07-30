package br.com.isaaclira.logitrackpro.controller;

import br.com.isaaclira.logitrackpro.exception.GlobalExceptionHandler;
import br.com.isaaclira.logitrackpro.exception.ResourceNotFoundException;
import br.com.isaaclira.logitrackpro.service.VeiculoService;
import br.com.isaaclira.logitrackpro.service.ViagemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

    @Mock
    private ViagemService viagemService;

    @Mock
    private VeiculoService veiculoService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(
                        new ViagemController(viagemService),
                        new VeiculoController(veiculoService)
                )
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void deveRetornarErroPadronizadoQuandoPayloadForInvalido() throws Exception {
        mockMvc.perform(post("/viagens")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "dataSaida": "2026-07-29T10:00:00",
                                  "origem": ""
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value("Um ou mais campos estão inválidos."))
                .andExpect(jsonPath("$.errors[0].field").exists())
                .andExpect(jsonPath("$.errors[0].message").exists());
    }

    @Test
    void deveRetornar404QuandoRecursoNaoExistir() throws Exception {
        when(veiculoService.buscarPorId(99L))
                .thenThrow(new ResourceNotFoundException("Veículo com id 99 não encontrado"));

        mockMvc.perform(get("/veiculos/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Veículo com id 99 não encontrado"));
    }
}