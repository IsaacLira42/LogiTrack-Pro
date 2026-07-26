// DashboardPage.tsx
import { ListaDeCards } from "../components/ListaDeCards";
import { adaptarDadosParaCards } from "../adapters/dashboardAdapter";
import { useDashboard } from "../hooks/useDashboard";

const DashboardPage = () => {
  const { data, error, isPending } = useDashboard();

  if (isPending) return <div>Carregando dashboard...</div>;
  if (error) return <p>Erro!</p>;
  if (!data) return <p>Sem dados</p>;

  const cardsFormatados = adaptarDadosParaCards(data);

  return <ListaDeCards cards={cardsFormatados} />;
};

export default DashboardPage;
