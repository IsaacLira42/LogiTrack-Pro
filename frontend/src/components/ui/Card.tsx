import type { CardProps } from "../../types/card";

export const Card = ({ titulo, valor, destaque = false }: CardProps) => {
  return (
    <article
      className={`flex flex-col justify-between min-h-45.5 p-8 border border-borda rounded-lg ${
        destaque ? "bg-accent text-white" : "bg-white text-text"
      }`}
    >
      <h3 className="text-xl">{titulo}</h3>

      <span className="text-3xl font-extrabold">{valor} KM</span>
    </article>
  );
};
