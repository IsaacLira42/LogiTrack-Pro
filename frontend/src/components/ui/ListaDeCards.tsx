import type { CardProps } from "../../types/card";
import { Card } from "./Card";

interface ListaDeCardsProps {
  cards: CardProps[];
}

export const ListaDeCards = ({ cards }: ListaDeCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.titulo} {...card} />
      ))}
    </div>
  );
};
