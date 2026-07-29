import { ProximasManutencoes } from "../../dashboard/components/ProximasManutencoes";
import { useManutecoes } from "../hooks/useManutencoes";

const ManutencaoPage = () => {
  const { data, isPending, error } = useManutecoes();

  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar as manutenções: {error.message}</div>;
  }

  return (
    <div>
      <ProximasManutencoes manutencoes={data} />
    </div>
  );
};

export default ManutencaoPage;
