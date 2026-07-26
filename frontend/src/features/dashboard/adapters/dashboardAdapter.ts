import type { CardProps } from "../types";
import type { DashboardApiResponse } from "../types";
import { Road, Wrench, DollarSign, Car } from "lucide-react";

export const adaptarDadosParaCards = (
  dadosDaApi: DashboardApiResponse,
): CardProps[] => [
  {
    id: 1,
    titulo: "Total de KM percorridos",
    valor: `${dadosDaApi.totalKm} KM`,
    icon: Road,
  },
  {
    id: 2,
    titulo: "Manutenções Pendentes",
    valor: dadosDaApi.proximasManutencoes.length,
    icon: Wrench,
  },
  {
    id: 3,
    titulo: "Custo Previsto",
    valor: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(dadosDaApi.projecaoFinanceira),
    icon: DollarSign,
  },
  {
    id: 4,
    titulo: "Veículo Mais Usado",
    valor: dadosDaApi.ranking.modelo,
    textoAuxiliar: `Placa: ${dadosDaApi.ranking.placa}`,
    destaque: true,
    icon: Car,
  },
];
