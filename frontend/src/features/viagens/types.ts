import z from "zod";
import type { Veiculo } from "../veiculos/types";

export interface ViagemResponseDTO {
  id: number;
  veiculo: Veiculo;
  dataSaida: string;
  dataChegada: string;
  origem: string;
  destino: string;
  kmPercorrida: number;
}

export interface FiltroViagem {
  placa: string;
  origem: string;
  destino: string;
}

export const ViagemRequestSchema = z.object({
  veiculoId: z
    .number({
      message: "O veículo é obrigatório",
    })
    .int()
    .positive("O veículo é obrigatório"),

  dataSaida: z
    .string({
      message: "A data de saída é obrigatória",
    })
    .min(1, "A data de saída é obrigatória"),

  dataChegada: z.string().optional(),

  origem: z
    .string({
      message: "A origem é obrigatória",
    })
    .min(1, "A origem é obrigatória")
    .max(100, "A origem deve ter no máximo 100 caracteres"),

  destino: z
    .string({
      message: "O destino é obrigatório",
    })
    .min(1, "O destino é obrigatório")
    .max(100, "O destino deve ter no máximo 100 caracteres"),

  kmPercorrida: z
    .number({
      message: "A quilometragem percorrida é obrigatória",
    })
    .positive("A quilometragem deve ser maior que zero"),
});

export type ViagemRequestDTO = z.infer<typeof ViagemRequestSchema>;

export const UpdateViagemSchema = z.object({
  id: z.number().int().positive(),
  viagem: ViagemRequestSchema,
});

export type UpdateViagemDTO = z.infer<typeof UpdateViagemSchema>;
