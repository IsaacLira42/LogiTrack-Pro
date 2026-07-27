import {
  LayoutDashboard,
  Car,
  Map,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router";

const menuItems: {
  label: string;
  path: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Veículos",
    path: "/veiculos",
    icon: Car,
  },
  {
    label: "Viagens",
    path: "/viagens",
    icon: Map,
  },
  {
    label: "Manutenção",
    path: "/manutencao",
    icon: Wrench,
  },
];

export const Sidebar = () => {
  return (
    <div className="h-full bg-primary border-r border-borda p-3 md:px-6 md:p-8 transition-all">
      <ul className="space-y-4 text-text text-[14px]">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors justify-center md:justify-start ${
                  isActive
                    ? "bg-accent text-white font-medium"
                    : "hover:bg-secondary/30"
                }`
              }
            >
              <Icon size={20} />
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
