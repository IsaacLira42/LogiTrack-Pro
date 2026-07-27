import type {
  FiltroViagem,
  Veiculo,
  ViagemRequestDTO,
  ViagemResponseDTO,
} from "./types.ts";
import { api } from "../../lib/axios.ts";

export async function buscarViagens(
  filtro: FiltroViagem,
): Promise<ViagemResponseDTO[]> {
  const { data } = await api.get("/viagens", {
    params: filtro,
  });

  return data;
}

export async function criarViagem(
  viagem: ViagemRequestDTO,
): Promise<ViagemResponseDTO> {
  const { data } = await api.post(`/viagens`, viagem);

  return data;
}

// TODO: Remover daqui
export async function buscarVeiculos(): Promise<Veiculo[]> {
  const { data } = await api.get("/veiculos");

  return data;
}
