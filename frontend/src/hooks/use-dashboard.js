import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";









export function useDashboard() {
  const statsQuery = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const data = await apiClient.get('/api/dashboard/stats');
      return data;
    },
  });

  return {
    stats: statsQuery.data,
    isLoading: statsQuery.isLoading,
  };
}



