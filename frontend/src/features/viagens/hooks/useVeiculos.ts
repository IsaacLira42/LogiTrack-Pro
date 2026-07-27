import { useQuery } from "@tanstack/react-query";
import { buscarVeiculos, buscarViagens } from "../service.viagens.ts";
import type { FiltroViagem } from "../types.ts";

export function useVeiculos() {
  return useQuery({
    queryKey: ["veiculos"],
    queryFn: buscarVeiculos,
  });
}

export function useViagens(filtro: FiltroViagem) {
  return useQuery({
    queryKey: ["Viagens", filtro],
    queryFn: () => buscarViagens(filtro),
  });
}
