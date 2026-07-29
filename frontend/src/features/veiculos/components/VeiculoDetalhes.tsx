import { Car, Truck, Route, Wrench, Gauge } from "lucide-react";
import type { DetalhesVeiculo } from "../types";

interface VeiculoDetalhesProps {
  detalhes: DetalhesVeiculo;
}

export const VeiculoDetalhes = ({ detalhes }: VeiculoDetalhesProps) => {
  const cards = [
    {
      titulo: "Total Viagens",
      valor: detalhes.totalViagens.toLocaleString("pt-BR"),
      icon: <Route size={20} />,
    },
    {
      titulo: "Km Rodados",
      valor: `${detalhes.totalKm.toLocaleString("pt-BR")} km`,
      icon: <Gauge size={20} />,
    },
    {
      titulo: "Custo Manutenção",
      valor: detalhes.custoManutencao.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      icon: <Wrench size={20} />,
    },
    {
      titulo: "Custo por Km",
      valor: detalhes.custoPorKm.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      icon: <Wrench size={20} />,
    },
  ];

  return (
    <div className="bg-white space-y-5">
      {/* Ícone e identificação do veículo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent">
          {detalhes.tipo === "PESADO" ? <Truck size={26} /> : <Car size={26} />}
        </div>

        <div>
          <h2 className="font-semibold text-lg">{detalhes.modelo}</h2>
          <p className="text-sm text-gray-500">Placa: {detalhes.placa}</p>
        </div>
      </div>

      {/* Cards de informações */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.titulo}
            className="flex flex-col gap-1 bg-[#C4C7C8] border border-borda p-3 rounded-md"
          >
            {card.icon}

            <span className="text-text text-xs">{card.titulo}</span>

            <span className="text-xl font-semibold">{card.valor}</span>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 border border-borda rounded-md">
          <span className="font-medium">Kilometragem Mensal</span>

          <div className="h-64">{/* Recharts usando detalhes.kmMensal */}</div>
        </div>

        <div className="p-4 border border-borda rounded-md">
          <span className="font-medium">
            Custo Médio de Manutenção (mensal)
          </span>

          <div className="h-64">
            {/* Recharts usando detalhes.manutencaoMensal */}
          </div>
        </div>
      </div>
    </div>
  );
};
