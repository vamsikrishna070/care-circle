import React from "react";
 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";















export function useMoods() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const moodsQuery = useQuery({
    queryKey: ['moods'],
    queryFn: async () => {
      const data = await apiClient.get('/api/moods?limit=30&days=30');
      return data;
    },
  });

  const statsQuery = useQuery({
    queryKey: ['mood-stats'],
    queryFn: async () => {
      const data = await apiClient.get('/api/moods/stats?days=7');
      return data;
    },
  });

  const createMoodMutation = useMutation({
    mutationFn: async (data) => {
      return await apiClient.post('/api/moods', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moods'] });
      queryClient.invalidateQueries({ queryKey: ['mood-stats'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast({ title: "Mood Logged", description: "Your mood has been tracked." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not log mood.", variant: "destructive" });
    },
  });

  return {
    moods: _nullishCoalesce(moodsQuery.data, () => ( [])),
    isLoadingMoods: moodsQuery.isLoading,
    stats: statsQuery.data,
    isLoadingStats: statsQuery.isLoading,
    createMoodMutation,
  };
}



