import type {
  FiltroViagem,
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

export async function removerViagem(id: number): Promise<void> {
  await api.delete(`/viagens/${id}`);
}

export async function atualizarViagem(
  id: number,
  viagem: ViagemRequestDTO,
): Promise<ViagemResponseDTO> {
  const { data } = await api.put(`/viagens/${id}`, viagem);

  return data;
}
