import { api } from "../../lib/axios";
import type { DashboardApiResponse } from "./types";

export async function getDashboard(): Promise<DashboardApiResponse> {
  const { data } = await api.get("/dashboard");

  return data;
}
