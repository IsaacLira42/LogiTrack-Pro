import {
  Car,
  Truck,
  Route,
  Wrench,
  Gauge,
  CircleDollarSign,
} from "lucide-react";
import type { DetalhesVeiculo } from "../types";
import { GraficoMensal } from "./GraficoMensal";

interface VeiculoDetalhesProps {
  detalhes: DetalhesVeiculo;
}

export const VeiculoDetalhes = ({ detalhes }: VeiculoDetalhesProps) => {
  const cards = [
    {
      titulo: "Total Viagens",
      valor: detalhes.totalViagens.toLocaleString("pt-BR"),
      icon: <Route size={20} className="text-accent" />,
    },
    {
      titulo: "Km Rodados",
      valor: `${detalhes.totalKm.toLocaleString("pt-BR")} km`,
      icon: <Gauge size={20} className="text-accent" />,
    },
    {
      titulo: "Custo Manutenção",
      valor: detalhes.custoManutencao.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      icon: <Wrench size={20} className="text-accent" />,
    },
    {
      titulo: "Custo por Km",
      valor: detalhes.custoPorKm.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      icon: <CircleDollarSign size={20} className="text-accent" />,
    },
  ];

  return (
    <div className="bg-white space-y-5">
      {/* Ícone e identificação do veículo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg text-accent">
          {detalhes.tipo === "PESADO" ? <Truck size={30} /> : <Car size={30} />}
        </div>

        <div className="flex flex-row gap-2 font-semibold text-[32px]">
          <h2 className=" text-black">{detalhes.modelo}</h2>
          <span className="text-black">-</span>
          <p className=" text-accent">{detalhes.placa}</p>
        </div>
      </div>

      {/* Cards de informações */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.titulo}
            className="flex flex-col gap-1 bg-[#F2F4F6] border border-borda p-3 rounded-md"
          >
            {card.icon}

            <span className="text-text text-xs">{card.titulo}</span>

            <span className="text-xl text-text font-semibold">
              {card.valor}
            </span>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 border border-borda rounded-md">
          <span className="font-medium text-black">Kilometragem Mensal</span>

          <div className="h-64 mt-4">
            <GraficoMensal dados={detalhes.kmMensal} unidade="km" />
          </div>
        </div>

        <div className="p-4 border border-borda rounded-md">
          <span className="font-medium text-black">
            Custo Médio de Manutenção
          </span>

          <div className="h-64 mt-4">
            <GraficoMensal dados={detalhes.manutencaoMensal} unidade="R$" />
          </div>
        </div>
      </div>
    </div>
  );
};
