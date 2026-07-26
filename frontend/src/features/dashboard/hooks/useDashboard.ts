import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../service.dashboard";

export function useDashboard() {
  return useQuery({
    queryKey: ["datasDashbord"],
    queryFn: getDashboard,
  });
}
