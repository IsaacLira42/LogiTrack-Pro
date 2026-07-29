import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../dashboard.service";

export function useDashboard() {
  return useQuery({
    queryKey: ["datasDashbord"],
    queryFn: getDashboard,
  });
}
