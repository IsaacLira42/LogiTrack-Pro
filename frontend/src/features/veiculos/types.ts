export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  tipo: string;
  ano: number;
}

export interface ListaVeiculosProps {
  veiculos: Veiculo[];
}
