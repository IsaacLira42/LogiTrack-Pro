import { useMutation, useQuery } from "@tanstack/react-query";
import {
  buscarVeiculos,
  buscarViagens,
  criarViagem,
} from "../service.viagens.ts";
import type { FiltroViagem } from "../types.ts";
import { queryClient } from "../../../lib/queryClient.ts";

export function useVeiculos() {
  return useQuery({
    queryKey: ["veiculos"],
    queryFn: buscarVeiculos,
  });
}

export function useViagens(filtro: FiltroViagem) {
  return useQuery({
    queryKey: ["viagens", filtro],
    queryFn: () => buscarViagens(filtro),
  });
}

export function useCreateViagem() {
  return useMutation({
    mutationFn: criarViagem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["viagens"],
      });
    },
  });
}
