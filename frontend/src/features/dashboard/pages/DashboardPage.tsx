// DashboardPage.tsx
import { ListaDeCards } from "../components/ListaDeCards";
import { adaptarDadosParaCards } from "../adapters/dashboardAdapter";
import { useDashboard } from "../hooks/useDashboard";
import { EvolucaoDeViagens } from "../components/EvolucaoDeViagens";

const DashboardPage = () => {
  const { data, error, isPending } = useDashboard();

  if (isPending) return <div>Carregando dashboard...</div>;
  if (error) return <p>Erro!</p>;
  if (!data) return <p>Sem dados</p>;

  const cardsFormatados = adaptarDadosParaCards(data);

  const dadosGrafico = data.kmPorDia.map((item) => ({
    data: item.dataSaida,
    km: item.kmTotal,
  }));

  return (
    <>
      <ListaDeCards cards={cardsFormatados} />
      <EvolucaoDeViagens kmPorDia={dadosGrafico} />
    </>
  );
};

export default DashboardPage;
