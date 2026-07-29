import { useQuery } from "@tanstack/react-query";
import { buscarDetalhesVeiculo, buscarVeiculos } from "../service.veiculos";

export function useVeiculos() {
  return useQuery({
    queryKey: ["veiculos"],
    queryFn: buscarVeiculos,
  });
}

export const useVeiculosDetalhes = (id: number | null) => {
  return useQuery({
    queryKey: ["veiculo-detalhes", id],
    queryFn: () => buscarDetalhesVeiculo(id!),
    enabled: !!id,
  });
};
