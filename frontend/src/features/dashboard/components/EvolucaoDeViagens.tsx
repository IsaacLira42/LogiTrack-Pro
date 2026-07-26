import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type KmPorDia = {
  data: string;
  km: number;
};

type EvolucaoDeViagensProps = {
  kmPorDia: KmPorDia[];
};

export const EvolucaoDeViagens = ({ kmPorDia }: EvolucaoDeViagensProps) => {
  const formatarData = (data: string | number | Date) =>
    new Date(data).toLocaleDateString("pt-BR");

  return (
    <div className="h-80 w-full rounded-lg border bg-primary border-borda p-8">
      <h2 className="mb-4 text-lg text-text font-semibold">
        Evolução de KM por Dia
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={kmPorDia}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="data"
            tickFormatter={(data) =>
              new Date(data).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })
            }
          />

          <YAxis />

          <Tooltip
            labelFormatter={(data) =>
              formatarData(data as string | number | Date)
            }
            formatter={(valor) => {
              if (typeof valor !== "number") {
                return ["0 KM", "Distância"];
              }

              return [`${valor} KM`, "Distância"];
            }}
          />

          <Line type="monotone" dataKey="km" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
