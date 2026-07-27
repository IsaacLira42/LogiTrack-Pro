// TODO: Remover da feature de viagem
export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  tipo: string;
  ano: number;
}

export interface Viagem {
  id: number;
  veiculo: Veiculo;
  dataSaida: string;
  dataChegada: string;
  origem: string;
  destino: string;
  kmPercorrida: number;
}

export interface FiltroViagem {
  placa: string;
  origem: string;
  destino: string;
}
