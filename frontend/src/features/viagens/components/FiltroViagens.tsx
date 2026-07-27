import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { FiltroViagem } from "../types";

const FiltroViagensSchema = z.object({
  placa: z.string(),
  origem: z.string(),
  destino: z.string(),
});

type FiltroViagensForm = z.infer<typeof FiltroViagensSchema>;

interface FiltroViagensProps {
  setFiltro: React.Dispatch<React.SetStateAction<FiltroViagem>>;
}

export const FiltroViagens = ({ setFiltro }: FiltroViagensProps) => {
  const { register, handleSubmit, reset } = useForm<FiltroViagensForm>({
    resolver: zodResolver(FiltroViagensSchema),
    defaultValues: {
      placa: "",
      origem: "",
      destino: "",
    },
  });

  function onSubmit(data: FiltroViagensForm) {
    setFiltro({
      placa: data.placa ?? "",
      origem: data.origem ?? "",
      destino: data.destino ?? "",
    });
  }

  function limparFiltros() {
    reset();

    setFiltro({
      placa: "",
      origem: "",
      destino: "",
    });
  }

  return (
    <div className="rounded-lg border border-borda bg-white p-6 mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-end gap-4"
      >
        <div className="flex min-w-45 flex-1 flex-col gap-2">
          <label htmlFor="placa" className="text-sm font-medium text-text">
            Placa
          </label>

          <input
            id="placa"
            {...register("placa")}
            placeholder="ABC-1234"
            className="
              h-11 rounded-lg
              border border-transparent
              bg-secondary
              px-4
              text-sm text-text
              placeholder:text-slate-400
              transition
              focus:border-accent
              focus:bg-white
              focus:outline-none
            "
          />
        </div>

        <div className="flex min-w-55 flex-1 flex-col gap-2">
          <label htmlFor="origem" className="text-sm font-medium text-text">
            Origem
          </label>

          <input
            id="origem"
            {...register("origem")}
            placeholder="Natal"
            className="
              h-11 rounded-lg
              border border-transparent
              bg-secondary
              px-4
              text-sm text-text
              placeholder:text-slate-400
              transition
              focus:border-accent
              focus:bg-white
              focus:outline-none
            "
          />
        </div>

        <div className="flex min-w-55 flex-1 flex-col gap-2">
          <label htmlFor="destino" className="text-sm font-medium text-text">
            Destino
          </label>

          <input
            id="destino"
            {...register("destino")}
            placeholder="Mossoró"
            className="
              h-11 rounded-lg
              border border-transparent
              bg-secondary
              px-4
              text-sm text-text
              placeholder:text-slate-400
              transition
              focus:border-accent
              focus:bg-white
              focus:outline-none
            "
          />
        </div>

        <div className="flex w-full gap-3 sm:w-auto">
          <button
            type="button"
            onClick={limparFiltros}
            className="
              h-11 flex-1 rounded-lg
              border border-borda
              bg-white
              px-5
              text-sm font-medium text-text
              transition
              hover:bg-gray-50
              sm:flex-none
            "
          >
            Limpar
          </button>

          <button
            type="submit"
            className="
              h-11 flex-1 rounded-lg
              bg-accent
              px-6
              text-sm font-medium text-white
              transition
              hover:opacity-90
              sm:flex-none
            "
          >
            Filtrar
          </button>
        </div>
      </form>
    </div>
  );
};
