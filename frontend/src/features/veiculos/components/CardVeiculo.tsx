import { Car, Calendar, Tag, Truck } from "lucide-react";
import type { Veiculo } from "../types";

export const CardVeiculo = (veiculo: Veiculo) => {
  return (
    <div className="flex flex-col p-6 gap-5 rounded-xl border border-borda bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent">
            {veiculo.tipo === "Pesado" ? (
              <Truck size={26} />
            ) : (
              <Car size={26} />
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-text">
              {veiculo.modelo}
            </h3>

            <span className="text-sm text-gray-500 font-medium tracking-wide">
              {veiculo.placa.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Informações */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <Calendar size={20} className="text-accent" />

          <div>
            <p className="text-xs text-gray-500">Ano</p>
            <span className="font-semibold text-text">{veiculo.ano}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <Tag size={20} className="text-accent" />

          <div>
            <p className="text-xs text-gray-500">Categoria</p>
            <span className="font-semibold text-text">{veiculo.tipo}</span>
          </div>
        </div>
      </div>

      {/* Ação */}
      <button className="w-full py-2.5 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition-opacity">
        Ver detalhes
      </button>
    </div>
  );
};
