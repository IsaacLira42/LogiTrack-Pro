import type { Viagem } from "../types";

interface TabelaViagensProps {
  viagens: Viagem[];
}

export const TabelaViagens = ({ viagens }: TabelaViagensProps) => {
  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-borda bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-250 border-collapse">
          <thead>
            <tr className="bg-secondary text-left">
              <th className="px-6 py-4 text-sm font-semibold text-text">
                Placa
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-text">
                Modelo
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-text">
                Tipo
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-text">Ano</th>
              <th className="px-6 py-4 text-sm font-semibold text-text">
                Data Saída
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-text">
                Data Chegada
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-text">
                Origem
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-text">
                Destino
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-text">KM</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-borda">
            {viagens.map((viagem) => (
              <tr
                key={viagem.id}
                className="
                  transition
                  hover:bg-secondary/50
                "
              >
                <td className="px-6 py-4 text-sm font-medium text-text">
                  {viagem.veiculo.placa}
                </td>

                <td className="px-6 py-4 text-sm text-text">
                  {viagem.veiculo.modelo}
                </td>

                <td className="px-6 py-4 text-sm text-text">
                  <span
                    className="
                      rounded-full
                      bg-accent/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-accent
                    "
                  >
                    {viagem.veiculo.tipo}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-text">
                  {viagem.veiculo.ano}
                </td>

                <td className="px-6 py-4 text-sm text-text">
                  {new Date(viagem.dataSaida).toLocaleString("pt-BR")}
                </td>

                <td className="px-6 py-4 text-sm text-text">
                  {new Date(viagem.dataChegada).toLocaleString("pt-BR")}
                </td>

                <td className="px-6 py-4 text-sm text-text">{viagem.origem}</td>

                <td className="px-6 py-4 text-sm text-text">
                  {viagem.destino}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-text">
                  {viagem.kmPercorrida.toFixed(2)} km
                </td>
              </tr>
            ))}

            {viagens.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="
                    px-6
                    py-10
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  Nenhuma viagem encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
