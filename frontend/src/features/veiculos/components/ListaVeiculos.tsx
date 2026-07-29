import { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import type { DetalhesVeiculo, ListaVeiculosProps } from "../types";
import { CardVeiculo } from "./CardVeiculo";
import { useVeiculosDetalhes } from "../hooks/useVeiculos";
import { VeiculoDetalhes } from "./VeiculoDetalhes";

export const ListaVeiculos = ({ veiculos }: ListaVeiculosProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [veiculoId, setVeiculoId] = useState<number | null>(null);

  const { data: detalhesVeiculo, isLoading } = useVeiculosDetalhes(veiculoId);

  if (!veiculos.length) {
    return (
      <div className="flex justify-center items-center py-12 text-gray-500">
        <p>Nenhum veículo cadastrado.</p>
      </div>
    );
  }

  const handlerAbrirModal = (id: number) => {
    setVeiculoId(id);
    setIsOpen(true);
  };

  const handlerFecharModal = () => {
    setIsOpen(false);
    setVeiculoId(null);
  };

  const detalhesMokados: DetalhesVeiculo = {
    modelo: "Mercedes Sprinter",
    placa: "KJG-1122",
    tipo: "LEVE",
    totalViagens: 7,
    totalKm: 1166.2,
    custoManutencao: 5860.0,
    custoPorKm: 5.0248670896930201,
    kmMensal: [
      {
        mes: "Jan",
        valor: 271.2,
      },
      {
        mes: "Feb",
        valor: 24.5,
      },
      {
        mes: "Mar",
        valor: 188.9,
      },
      {
        mes: "Apr",
        valor: 280.2,
      },
      {
        mes: "May",
        valor: 25.3,
      },
      {
        mes: "Jun",
        valor: 189.6,
      },
      {
        mes: "Jul",
        valor: 186.5,
      },
    ],
    manutencaoMensal: [
      {
        mes: "May",
        valor: 2200.0,
      },
      {
        mes: "Feb",
        valor: 380.0,
      },
      {
        mes: "Jul",
        valor: 2300.0,
      },
      {
        mes: "Aug",
        valor: 980.0,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <Modal isOpen={isOpen} onClose={handlerFecharModal} maxWidth="max-w-4xl">
        {isLoading && <p>Carregando detalhes...</p>}

        {detalhesVeiculo && <VeiculoDetalhes detalhes={detalhesVeiculo} />}
      </Modal>

      {veiculos.map((veiculo) => (
        <CardVeiculo
          key={veiculo.id}
          {...veiculo}
          openModal={handlerAbrirModal}
        />
      ))}
    </div>
  );
};
