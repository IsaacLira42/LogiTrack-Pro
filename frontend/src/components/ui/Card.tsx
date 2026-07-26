import type { CardProps } from "../../features/dashboard/types";

export const Card = ({
  titulo,
  valor,
  textoAuxiliar,
  destaque = false,
  icon: Icon,
}: CardProps) => {
  return (
    <article
      className={`flex flex-col justify-between min-h-45.5 p-8 border border-borda rounded-lg ${
        destaque ? "bg-accent text-white" : "bg-white text-text"
      }`}
    >
      <div className="flex flex-row justify-between">
        <h3 className="text-[14px] font-medium">{titulo}</h3>
        {Icon && <Icon size={20} />}
      </div>

      <div className="flex flex-col">
        <span className="text-4xl font-extrabold font-poppins">{valor}</span>

        {textoAuxiliar ? (
          <span className="text-[14px] font-poppins">{textoAuxiliar}</span>
        ) : (
          <></>
        )}
      </div>
    </article>
  );
};
