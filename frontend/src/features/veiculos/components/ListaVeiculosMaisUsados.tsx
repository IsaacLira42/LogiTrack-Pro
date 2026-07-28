import type { ListaVeiculosProps } from "../types";
import { Car, Truck } from "lucide-react";

export const ListaVeiculosMaisUsados = ({ veiculos }: ListaVeiculosProps) => {
  return (
    <div className="bg-white rounded-xl border border-borda p-6">
      <h3 className="text-xl font-semibold text-text mb-5">
        Veículos mais usados
      </h3>

      <div className="flex flex-col gap-4">
        {veiculos.slice(0, 5).map((veiculo, index) => (
          <div key={veiculo.id} className="flex items-center gap-3">
            <span className="w-6 text-sm font-bold text-gray-400">
              {index + 1}
            </span>

            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
              {veiculo.tipo === "Pesado" ? (
                <Truck size={20} />
              ) : (
                <Car size={20} />
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm text-text">
                {veiculo.modelo}
              </span>

              <span className="text-xs text-gray-500">
                {veiculo.placa.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
