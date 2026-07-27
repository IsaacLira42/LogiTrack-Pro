import type { FiltroViagem, Veiculo, Viagem } from "./types.ts";
import { api } from "../../lib/axios.ts";

export async function buscarViagens(filtro: FiltroViagem): Promise<Viagem[]> {
  const { data } = await api.get("/viagens", {
    params: filtro,
  });

  return data;
}

// TODO: Remover daqui
export async function buscarVeiculos(): Promise<Veiculo[]> {
  const { data } = await api.get("/veiculos");

  return data;
}
