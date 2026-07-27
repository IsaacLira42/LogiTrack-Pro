import { useState } from "react";
import { CabecalhoDaPagina } from "../components/CabecalhoDaPagina.tsx";
import { FiltroViagens } from "../components/FiltroViagens.tsx";
import { TabelaViagens } from "../components/TabelaViagens.tsx";
import { useViagens } from "../hooks/useVeiculos.ts";
import type { FiltroViagem } from "../types.ts";

const ViagensPage = () => {
  const [filtro, setFiltro] = useState<FiltroViagem>({
    placa: "",
    origem: "",
    destino: "",
  });

  const { data, isPending, error } = useViagens(filtro);

  if (isPending) return <div>Carregando...</div>;
  if (error) return <p>Erro!</p>;

  return (
    <div>
      <CabecalhoDaPagina />
      <FiltroViagens setFiltro={setFiltro} />
      <TabelaViagens viagens={data} />
    </div>
  );
};

export default ViagensPage;
