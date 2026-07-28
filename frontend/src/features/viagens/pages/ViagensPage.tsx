import { useState } from "react";
import { CabecalhoDaPagina } from "../components/CabecalhoDaPagina";
import { FiltroViagens } from "../components/FiltroViagens";
import { TabelaViagens } from "../components/TabelaViagens";
import {
  useCreateViagem,
  useRemoveViagem,
  useUpdateViagem,
  useViagens,
} from "../hooks/useVeiculos";
import type {
  FiltroViagem,
  ViagemResponseDTO,
  ViagemRequestDTO,
} from "../types";
import { Modal } from "../../../components/ui/Modal";
import { FormularioViagem } from "../components/FormularioCriarViagem";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";

const ViagensPage = () => {
  const [filtro, setFiltro] = useState<FiltroViagem>({
    placa: "",
    origem: "",
    destino: "",
  });

  const { data = [], isPending, error } = useViagens(filtro);

  const [isOpen, setIsOpen] = useState(false);

  const [viagemSelecionada, setViagemSelecionada] =
    useState<ViagemResponseDTO | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [viagemParaRemover, setViagemParaRemover] = useState<number | null>(
    null,
  );

  const createViagem = useCreateViagem();
  const removeViagem = useRemoveViagem();
  const updateViagem = useUpdateViagem();

  const abrirModalCriacao = () => {
    setViagemSelecionada(null);
    setIsOpen(true);
  };

  const fecharModal = () => {
    setIsOpen(false);
    setViagemSelecionada(null);
  };

  const confirmarRemocao = () => {
    if (viagemParaRemover == null) return;

    removeViagem.mutate(viagemParaRemover, {
      onSuccess: () => {
        setIsConfirmOpen(false);
        setViagemParaRemover(null);
      },
    });
  };

  const handleRemover = (id: number) => {
    setViagemParaRemover(id);
    setIsConfirmOpen(true);
  };

  const handleEditar = (viagem: ViagemResponseDTO) => {
    setViagemSelecionada(viagem);
    setIsOpen(true);
  };

  const handleSubmit = (data: ViagemRequestDTO) => {
    if (viagemSelecionada) {
      updateViagem.mutate({
        id: viagemSelecionada.id,
        viagem: data,
      });
    } else {
      createViagem.mutate(data);
    }

    fecharModal();
  };

  if (isPending) return <div>Carregando...</div>;
  if (error) return <p>Erro!</p>;

  return (
    <div>
      <CabecalhoDaPagina abrirModal={abrirModalCriacao} />

      <Modal isOpen={isOpen} onClose={fecharModal}>
        <FormularioViagem
          viagem={viagemSelecionada}
          onSubmit={handleSubmit}
          isPending={createViagem.isPending || updateViagem.isPending}
        />
      </Modal>

      <FiltroViagens setFiltro={setFiltro} />

      <TabelaViagens
        viagens={data}
        onRemove={handleRemover}
        onEditar={handleEditar}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Remover viagem"
        description="Tem certeza que deseja remover esta viagem? Esta ação não poderá ser desfeita."
        confirmText="Remover"
        cancelText="Cancelar"
        isPending={removeViagem.isPending}
        onCancel={() => {
          setIsConfirmOpen(false);
          setViagemParaRemover(null);
        }}
        onConfirm={confirmarRemocao}
      />
    </div>
  );
};

export default ViagensPage;
