import { ListaVeiculos } from "../components/ListaVeiculos";
import { useVeiculos } from "../hooks/useVeiculos";
// import { ListaVeiculosMaisUsados } from "../components/ListaVeiculosMaisUsados";

const VeiculosPage = () => {
  const { data, isPending, error } = useVeiculos();

  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Carregando...</div>;
  }

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
          <ListaVeiculos veiculos={data} />
        </div>

        {/* Lista lateral */}
        {/* <aside className="w-full xl:w-75">
          <ListaVeiculosMaisUsados veiculos={veiculosMock} />
        </aside> */}
      </section>
    </main>
  );
};

export default VeiculosPage;
