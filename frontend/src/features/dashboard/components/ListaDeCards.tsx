import { Card } from "../../../components/ui/Card";
import type { ListaDeCardsProps } from "../types";

export const ListaDeCards = ({ cards }: ListaDeCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        id={cards[0].id}
        titulo="Total de KM percorridos"
        valor={cards[0].valor}
        icon={cards[0].icon}
      />
      <Card
        id={cards[1].id}
        titulo={cards[1].titulo}
        valor={cards[1].valor}
        icon={cards[1].icon}
      />
      <Card
        id={cards[2].id}
        titulo={cards[2].titulo}
        valor={cards[2].valor}
        destaque={true}
        icon={cards[2].icon}
      />
      <Card
        id={cards[3].id}
        titulo={cards[3].titulo}
        valor={cards[3].valor}
        textoAuxiliar={cards[3].textoAuxiliar}
        icon={cards[3].icon}
      />
    </div>
  );
};
