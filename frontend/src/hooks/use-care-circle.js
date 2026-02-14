import React from "react";
 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";









export function useCareCircle() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const contactsQuery = useQuery({
    queryKey: ['care-contacts'],
    queryFn: async () => {
      const data = await apiClient.get('/api/care-contacts');
      return data;
    },
  });

  const createContactMutation = useMutation({
    mutationFn: async (data) => {
      return await apiClient.post('/api/care-contacts', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['care-contacts'] });
      toast({ title: "Contact Added", description: "They have been added to your circle." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not add contact.", variant: "destructive" });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id) => {
      return await apiClient.delete(`/api/care-contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['care-contacts'] });
      toast({ title: "Contact Removed", description: "Contact has been removed from your circle." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not remove contact.", variant: "destructive" });
    },
  });

  const notifyCircleMutation = useMutation({
    mutationFn: async () => {
      // This would typically send emails to all contacts
      // For now, we'll just show a toast
      return Promise.resolve();
    },
    onSuccess: () => {
      toast({ title: "Alert Sent", description: "Your Care Circle has been notified." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not send alert.", variant: "destructive" });
    },
  });

  return {
    contacts: _nullishCoalesce(contactsQuery.data, () => ( [])),
    isLoading: contactsQuery.isLoading,
    createContactMutation,
    deleteContactMutation,
    notifyCircleMutation,
  };
}



