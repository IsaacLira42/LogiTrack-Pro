import { useState } from "react";
import { CabecalhoDaPagina } from "../components/CabecalhoDaPagina.tsx";
import { FiltroViagens } from "../components/FiltroViagens.tsx";
import { TabelaViagens } from "../components/TabelaViagens.tsx";
import { useViagens } from "../hooks/useVeiculos.ts";
import type { FiltroViagem } from "../types.ts";
import { Modal } from "../../../components/ui/Modal.tsx";
import { FormularioCriarViagem } from "../components/FormularioCriarViagem.tsx";

const ViagensPage = () => {
  const [filtro, setFiltro] = useState<FiltroViagem>({
    placa: "",
    origem: "",
    destino: "",
  });

  const { data, isPending, error } = useViagens(filtro);

  const [isOpen, onClose] = useState<boolean>(false);

  const abrirFecharModal = () => onClose(isOpen ? false : true);

  if (isPending) return <div>Carregando...</div>;
  if (error) return <p>Erro!</p>;

  return (
    <div>
      <CabecalhoDaPagina abrirModal={abrirFecharModal} />
      <FiltroViagens setFiltro={setFiltro} />
      <TabelaViagens viagens={data} />
      <Modal isOpen={isOpen} onClose={abrirFecharModal}>
        <FormularioCriarViagem />
      </Modal>
    </div>
  );
};

export default ViagensPage;
