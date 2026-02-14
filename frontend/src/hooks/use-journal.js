import React from "react";
 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";









export function useJournal() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const entriesQuery = useQuery({
    queryKey: ['journal'],
    queryFn: async () => {
      const data = await apiClient.get('/api/journal?limit=20');
      return data;
    },
  });

  const createEntryMutation = useMutation({
    mutationFn: async (data) => {
      return await apiClient.post('/api/journal', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast({ title: "Journal Entry Saved", description: "Your thoughts are safe with us." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not save entry.", variant: "destructive" });
    },
  });

  return {
    entries: _nullishCoalesce(_optionalChain([entriesQuery, 'access', _ => _.data, 'optionalAccess', _2 => _2.entries]), () => ( [])),
    isLoading: entriesQuery.isLoading,
    createEntryMutation,
  };
}



