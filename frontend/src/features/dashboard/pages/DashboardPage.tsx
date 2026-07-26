import { ListaDeCards } from "../components/ListaDeCards";
import { EvolucaoDeViagens } from "../components/EvolucaoDeViagens";
import { GraficoVolumeCategoria } from "../components/VolumeCategoria";
import { adaptarDadosParaCards } from "../adapters/dashboardAdapter";
import { useDashboard } from "../hooks/useDashboard";
import { ProximasManutencoes } from "../components/ProximasManutencoes";

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

  const dadosCategoria = data.volumeCategoria.map((item) => ({
    categoria: item.tipo === "LEVE" ? "Leves" : "Pesados",
    quantidade: item.quantidade,
  }));

  const proximasManutencoes = data.proximasManutencoes;

  return (
    <div className="space-y-6">
      <ListaDeCards cards={cardsFormatados} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <EvolucaoDeViagens kmPorDia={dadosGrafico} />
        </div>

        <div className="lg:col-span-4">
          <GraficoVolumeCategoria dados={dadosCategoria} />
        </div>
      </div>

      <ProximasManutencoes manutencoes={proximasManutencoes} />
    </div>
  );
};

export default DashboardPage;
