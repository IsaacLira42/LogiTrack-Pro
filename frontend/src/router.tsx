import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ViagensPage from "./features/viagens/pages/ViagensPage";
import VeiculosPage from "./features/veiculos/page/VeiculosPage";

export const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/veiculos" element={<VeiculosPage />} />
      <Route path="/viagens" element={<ViagensPage />} />
      {/* <Route path="/manutencao" element={<ManutencaoPage />} /> */}

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
