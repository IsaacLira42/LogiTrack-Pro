import { useQuery } from "@tanstack/react-query";
import { buscarVeiculos } from "../service.veiculos";

export function useVeiculos() {
  return useQuery({
    queryKey: ["veiculos"],
    queryFn: buscarVeiculos,
  });
}
