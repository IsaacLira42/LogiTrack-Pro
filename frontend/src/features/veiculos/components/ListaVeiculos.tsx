import type { ListaVeiculosProps } from "../types";
import { CardVeiculo } from "./CardVeiculo";

export const ListaVeiculos = ({ veiculos }: ListaVeiculosProps) => {
  if (!veiculos.length) {
    return (
      <div className="flex justify-center items-center py-12 text-gray-500">
        <p>Nenhum veículo cadastrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {veiculos.map((veiculo) => (
        <CardVeiculo key={veiculo.id} {...veiculo} />
      ))}
    </div>
  );
};
