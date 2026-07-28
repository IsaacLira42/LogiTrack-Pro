import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ViagemRequestSchema,
  type ViagemRequestDTO,
  type ViagemResponseDTO,
} from "../types";
import { useVeiculos } from "../hooks/useVeiculos";

interface FormularioViagemProps {
  onSubmit: (data: ViagemRequestDTO) => void;
  isPending?: boolean;
  viagem?: ViagemResponseDTO | null;
}

export const FormularioViagem = ({
  onSubmit,
  isPending = false,
  viagem,
}: FormularioViagemProps) => {
  const { data: veiculos = [], isLoading } = useVeiculos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ViagemRequestDTO>({
    resolver: zodResolver(ViagemRequestSchema),
  });

  useEffect(() => {
    if (viagem) {
      reset({
        veiculoId: viagem.veiculo.id,
        dataSaida: viagem.dataSaida.slice(0, 16),
        dataChegada: viagem.dataChegada ? viagem.dataChegada.slice(0, 16) : "",
        origem: viagem.origem,
        destino: viagem.destino,
        kmPercorrida: viagem.kmPercorrida,
      });
    } else {
      reset({
        veiculoId: undefined,
        dataSaida: "",
        dataChegada: "",
        origem: "",
        destino: "",
        kmPercorrida: undefined,
      });
    }
  }, [viagem, reset]);

  const submit = (data: ViagemRequestDTO) => {
    onSubmit(data);
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-borda bg-white px-3 py-2.5 text-text shadow-sm transition outline-none placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20";

  const labelClass = "text-sm font-medium text-text";

  const errorClass = "mt-1 text-sm text-red-500";

  const editando = !!viagem;

  return (
    <div>
      <div className="mb-6 border-b border-borda pb-4">
        <h2 className="font-poppins text-2xl font-semibold text-text">
          {editando ? "Editar viagem" : "Nova viagem"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {editando
            ? "Atualize os dados da viagem."
            : "Preencha os dados abaixo para cadastrar uma nova viagem."}
        </p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Veículo</label>

            <select
              className={inputClass}
              disabled={isLoading}
              {...register("veiculoId", {
                valueAsNumber: true,
              })}
            >
              <option value="" disabled>
                {isLoading ? "Carregando veículos..." : "Selecione um veículo"}
              </option>

              {veiculos.map((veiculo) => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.placa} • {veiculo.modelo} ({veiculo.ano})
                </option>
              ))}
            </select>

            {errors.veiculoId && (
              <p className={errorClass}>{errors.veiculoId.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Quilometragem</label>

            <input
              type="number"
              step="0.01"
              placeholder="0,00 km"
              className={inputClass}
              {...register("kmPercorrida", {
                valueAsNumber: true,
              })}
            />

            {errors.kmPercorrida && (
              <p className={errorClass}>{errors.kmPercorrida.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Data de saída</label>

            <input
              type="datetime-local"
              className={inputClass}
              {...register("dataSaida")}
            />

            {errors.dataSaida && (
              <p className={errorClass}>{errors.dataSaida.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Data de chegada</label>

            <input
              type="datetime-local"
              className={inputClass}
              {...register("dataChegada")}
            />

            {errors.dataChegada && (
              <p className={errorClass}>{errors.dataChegada.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Origem</label>

            <input
              type="text"
              placeholder="Ex.: Natal/RN"
              className={inputClass}
              {...register("origem")}
            />

            {errors.origem && (
              <p className={errorClass}>{errors.origem.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Destino</label>

            <input
              type="text"
              placeholder="Ex.: Mossoró/RN"
              className={inputClass}
              {...register("destino")}
            />

            {errors.destino && (
              <p className={errorClass}>{errors.destino.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t border-borda pt-5">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-accent px-6 py-2.5 font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending
              ? "Salvando..."
              : editando
                ? "Atualizar viagem"
                : "Criar viagem"}
          </button>
        </div>
      </form>
    </div>
  );
};
