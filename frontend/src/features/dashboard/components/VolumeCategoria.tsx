import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0053db", "#444748"];

type Categoria = {
  categoria: string;
  quantidade: number;
};

type Props = {
  dados: Categoria[];
};

export const GraficoVolumeCategoria = ({ dados }: Props) => {
  return (
    <div className="h-92 w-full rounded-lg border border-borda bg-primary p-8">
      <h2 className="mb-4 text-lg font-semibold text-text">
        Volume por Categoria
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={dados}
            dataKey="quantidade"
            nameKey="categoria"
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            cornerRadius={6}
            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {dados.map((_, index) => (
              <Cell key={dados[index].categoria} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => {
              const quantidade = typeof value === "number" ? value : 0;

              return [`${quantidade} viage${quantidade !== 1 ? "ns" : "m"}`];
            }}
          />

          <Legend verticalAlign="bottom" align="center" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
