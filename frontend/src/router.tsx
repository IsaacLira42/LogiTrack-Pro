import { Route, Routes } from "react-router";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ViagensPage from "./features/viagens/pages/ViagensPage";

export const Rotas = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/viagens" element={<ViagensPage />} />
    </Routes>
  );
};
