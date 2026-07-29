import { useMutation, useQuery } from "@tanstack/react-query";
import {
  atualizarViagem,
  buscarViagens,
  criarViagem,
  removerViagem,
} from "../viagens.service.ts";
import type { FiltroViagem, UpdateViagemDTO } from "../types.ts";
import { queryClient } from "../../../lib/queryClient.ts";

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
