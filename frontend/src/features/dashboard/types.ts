import type { LucideIcon } from "lucide-react";

export interface CardProps {
  id: number;
  titulo: string;
  valor: string | number;
  textoAuxiliar?: string;
  destaque?: boolean;
  icon?: LucideIcon;
}

export interface ListaDeCardsProps {
  cards: CardProps[];
}

// types.ts
export interface Manutencao {
  id: number;
  placa: string;
  modelo: string;
  tipoServico: string;
  dataInicio: string;
  status: string;
  custoEstimado: number;
}

export interface DashboardApiResponse {
  totalKm: number;
  volumeCategoria: {
    tipo: string;
    quantidade: number;
  }[];
  proximasManutencoes: Manutencao[];
  ranking: {
    id: number;
    placa: string;
    modelo: string;
    kmTotal: number;
  };
  projecaoFinanceira: number;
}
