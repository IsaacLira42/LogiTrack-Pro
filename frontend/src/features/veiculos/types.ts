import { z } from "zod";

export const TipoVeiculoSchema = z.enum(["LEVE", "PESADO"]);

export type TipoVeiculo = z.infer<typeof TipoVeiculoSchema>;

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  tipo: TipoVeiculo;
  ano: number;
}

export interface ListaVeiculosProps {
  veiculos: Veiculo[];
}

export const DadosMensaisSchema = z.object({
  mes: z.string(),
  valor: z.number(),
});

export const DetalhesVeiculoSchema = z.object({
  modelo: z.string(),
  placa: z.string(),
  tipo: TipoVeiculoSchema,

  totalViagens: z.number(),
  totalKm: z.number(),

  custoManutencao: z.number(),
  custoPorKm: z.number(),

  kmMensal: z.array(DadosMensaisSchema),

  manutencaoMensal: z.array(DadosMensaisSchema),
});

export type DetalhesVeiculo = z.infer<typeof DetalhesVeiculoSchema>;

export type DadosMensais = z.infer<typeof DadosMensaisSchema>;
