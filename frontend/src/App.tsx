import { Layout } from "./components/layout/Layout";
import { ListaDeCards } from "./components/ui/ListaDeCards";

function App() {
  // DADOS MOKADOS
  const cards = [
    {
      titulo: "Distância",
      valor: 15,
    },
    {
      titulo: "Visitantes",
      valor: 200,
    },
    {
      titulo: "Avaliação",
      valor: 5,
      destaque: true,
    },
    {
      titulo: "Avaliação",
      valor: 5,
    },
  ];

  return (
    <Layout>
      <ListaDeCards cards={cards} />
    </Layout>
  );
}

export default App;
