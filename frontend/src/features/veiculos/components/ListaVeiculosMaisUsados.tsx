import type { ListaVeiculosProps } from "../types";
import { Car, Truck } from "lucide-react";

export const ListaVeiculosMaisUsados = ({ veiculos }: ListaVeiculosProps) => {
  const veiculosExibidos = veiculos.slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-borda p-6">
      <h3 className="text-xl font-semibold text-text mb-5">
        Veículos mais usados
      </h3>

      {veiculosExibidos.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum veículo encontrado.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {veiculosExibidos.map((veiculo, index) => (
            <div key={veiculo.id} className="flex items-center gap-3">
              <span className="w-6 font-bold text-accent">{index + 1}º</span>

              <div className="flex items-center justify-center w-10 h-10 rounded-lg text-accent">
                {veiculo.tipo === "Pesado" ? (
                  <Truck size={20} aria-hidden="true" />
                ) : (
                  <Car size={20} aria-hidden="true" />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-text truncate">
                  {veiculo.modelo}
                </span>

                <span className="text-xs text-gray-500">
                  {veiculo.placa.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
