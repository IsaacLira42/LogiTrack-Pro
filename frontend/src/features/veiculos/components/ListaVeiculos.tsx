import { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import type { ListaVeiculosProps } from "../types";
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
