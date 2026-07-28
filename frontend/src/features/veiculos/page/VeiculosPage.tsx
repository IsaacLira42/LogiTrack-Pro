import { ListaVeiculos } from "../components/ListaVeiculos";
import { ListaVeiculosMaisUsados } from "../components/ListaVeiculosMaisUsados";

const VeiculosPage = () => {
  // TODO: Remover esse Mock
  const veiculosMock = [
    {
      id: 1,
      modelo: "Scania R450",
      placa: "ABC-1234",
      ano: 2021,
      tipo: "Pesado",
    },
    {
      id: 2,
      modelo: "Volvo FH 540",
      placa: "DEF-5678",
      ano: 2022,
      tipo: "Pesado",
    },
    {
      id: 3,
      modelo: "Mercedes-Benz Actros 2651",
      placa: "GHI-9012",
      ano: 2020,
      tipo: "Pesado",
    },
    {
      id: 4,
      modelo: "Volkswagen Delivery 11.180",
      placa: "JKL-3456",
      ano: 2023,
      tipo: "Médio",
    },
    {
      id: 5,
      modelo: "Fiat Strada Endurance",
      placa: "MNO-7890",
      ano: 2024,
      tipo: "Leve",
    },
  ];

  return (
    <main className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <section>
        <h2 className="text-text text-5xl font-bold mb-2">Veículos</h2>

        <p className="text-text">
          Visualize todos os veículos cadastrados na frota.
        </p>
      </section>

      {/* Conteúdo */}
      <section className="flex flex-col xl:flex-row gap-8">
        {/* Lista principal */}
        <div className="flex-1">
          <ListaVeiculos veiculos={veiculosMock} />
        </div>

        {/* Lista lateral */}
        <aside className="w-full xl:w-75">
          <ListaVeiculosMaisUsados veiculos={veiculosMock} />
        </aside>
      </section>
    </main>
  );
};

export default VeiculosPage;
