import { api } from "../../lib/axios";
import type { Veiculo } from "./types";

export async function buscarVeiculos(): Promise<Veiculo[]> {
  const { data } = await api.get("/veiculos");

  return data;
}
