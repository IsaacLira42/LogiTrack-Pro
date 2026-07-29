import { api } from "../../lib/axios";
import type { DetalhesVeiculo, Veiculo } from "./types";

export async function buscarVeiculos(): Promise<Veiculo[]> {
  const { data } = await api.get("/veiculos");

  return data;
}

export async function buscarDetalhesVeiculo(
  id: number,
): Promise<DetalhesVeiculo> {
  const { data } = await api.get(`/veiculos/${id}/detalhes`);

  return data;
}
