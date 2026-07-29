import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import type { DadosMensais } from "../types";

interface GraficoMensalProps {
  dados: DadosMensais[];
  unidade?: string;
}

export const GraficoMensal = ({ dados, unidade = "" }: GraficoMensalProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dados}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="mes" />

        <YAxis />

        <Tooltip
          formatter={(value) =>
            `${Number(value).toLocaleString("pt-BR")} ${unidade}`
          }
        />

        <Line
          type="monotone"
          dataKey="valor"
          stroke="blue"
          strokeWidth={2}
          dot
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
