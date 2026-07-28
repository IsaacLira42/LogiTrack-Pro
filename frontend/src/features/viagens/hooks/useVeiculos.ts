import { useMutation, useQuery } from "@tanstack/react-query";
import {
  atualizarViagem,
  buscarVeiculos,
  buscarViagens,
  criarViagem,
  removerViagem,
} from "../service.viagens.ts";
import type { FiltroViagem, UpdateViagemDTO } from "../types.ts";
import { queryClient } from "../../../lib/queryClient.ts";

// TODO: Remover daqui
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
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["viagens"],
      }),
  });
}

export function useRemoveViagem() {
  return useMutation({
    mutationFn: removerViagem,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["viagens"],
      }),
  });
}

export function useUpdateViagem() {
  return useMutation({
    mutationFn: ({ id, viagem }: UpdateViagemDTO) =>
      atualizarViagem(id, viagem),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["viagens"],
      }),
  });
}
