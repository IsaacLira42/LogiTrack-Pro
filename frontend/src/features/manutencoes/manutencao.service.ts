import { api } from "../../lib/axios";
import type { Manutencao } from "../dashboard/types";

export async function getTodasManutencoes(): Promise<Manutencao[]> {
  const { data } = await api.get("/manutencoes");
  return data;
}
