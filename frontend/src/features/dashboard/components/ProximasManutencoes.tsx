import type { Manutencao } from "../types";

type Props = {
  title?: string;
  manutencoes: Manutencao[];
};

const statusStyles: Record<string, string> = {
  PENDENTE: "bg-yellow-100 text-yellow-800",
  CONCLUIDA: "bg-green-100 text-green-800",
  EM_REALIZACAO: "bg-blue-100 text-blue-800",
};

export const ProximasManutencoes = ({ title, manutencoes }: Props) => {
  return (
    <div className="rounded-lg border border-borda bg-primary p-8">
      <h2 className="mb-6 text-lg font-semibold text-text">
        {title || "Próximas Manutenções"}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="rounded-lg">
            <tr className="bg-borda text-left">
              <th className="rounded-l-lg px-4 py-3 font-medium text-text">
                Placa
              </th>
              <th className="px-4 py-3 font-medium text-text">Modelo</th>
              <th className="px-4 py-3 font-medium text-text">Serviço</th>
              <th className="px-4 py-3 font-medium text-text">Data</th>
              <th className="px-4 py-3 font-medium text-text">Status</th>
              <th className="rounded-r-lg px-4 py-3 text-right font-medium text-text">
                Custo Estimado
              </th>
            </tr>
          </thead>

          <tbody>
            {manutencoes.map((manutencao) => (
              <tr
                key={manutencao.id}
                className="border-b border-borda text-text last:border-0"
              >
                <td className="px-4 py-4">{manutencao.placa}</td>

                <td className="px-4">{manutencao.modelo}</td>

                <td className="px-4">{manutencao.tipoServico}</td>

                <td className="px-4">
                  {new Date(manutencao.dataInicio).toLocaleDateString("pt-BR")}
                </td>

                <td className="px-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      statusStyles[manutencao.status]
                    }`}
                  >
                    {manutencao.status}
                  </span>
                </td>

                <td className="px-4 text-right">
                  {manutencao.custoEstimado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
