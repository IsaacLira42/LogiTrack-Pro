import { LayoutDashboard, Car, Map, Wrench } from "lucide-react";

import { Button } from "../ui/Button";

export const Sidebar = () => {
  return (
    <div className="h-full bg-primary border-r border-borda p-3 md:p-6 transition-all">
      <Button
        className="w-full"
        texto={
          <>
            <span className="md:hidden text-[14px] font-bold">+</span>
            <span className="hidden md:inline">+ Novo Veículo</span>
          </>
        }
      />

      <ul className="mt-6 space-y-4 text-text text-[14px]">
        <li className="flex items-center gap-3 cursor-pointer justify-center md:justify-start">
          <LayoutDashboard size={20} />
          <span className="hidden md:inline">Dashboard</span>
        </li>

        <li className="flex items-center gap-3 cursor-pointer justify-center md:justify-start">
          <Car size={20} />
          <span className="hidden md:inline">Veículos</span>
        </li>

        <li className="flex items-center gap-3 cursor-pointer justify-center md:justify-start">
          <Map size={20} />
          <span className="hidden md:inline">Viagens</span>
        </li>

        <li className="flex items-center gap-3 cursor-pointer justify-center md:justify-start">
          <Wrench size={20} />
          <span className="hidden md:inline">Manutenção</span>
        </li>
      </ul>
    </div>
  );
};
