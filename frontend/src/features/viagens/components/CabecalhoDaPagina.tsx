import { Button } from "../../../components/ui/Button";

export const CabecalhoDaPagina = ({
  abrirModal,
}: {
  abrirModal: () => void;
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <h2 className="text-text text-5xl font-bold mb-2">Viagens</h2>
        <p className="text-text">
          Gerencie todas as rotas ativas e o histórico da frota
        </p>
      </div>

      <div>
        <Button
          onClick={abrirModal}
          className="w-full"
          texto={"+ Nova Viagem"}
        />
      </div>
    </div>
  );
};
