import { useQuery } from "@tanstack/react-query";
import { getTodasManutencoes } from "../manutencao.service";

export function useManutecoes() {
  return useQuery({
    queryKey: ["TodasManutencoes"],
    queryFn: getTodasManutencoes,
  });
}
