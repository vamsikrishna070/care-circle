import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";














export function useAuth() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      try {
        const data = await apiClient.get('/api/auth/me');
        return data;
      } catch (error) {
        localStorage.removeItem('token');
        return null;
      }
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const data = await apiClient.post('/api/auth/login', credentials);
      localStorage.setItem('token', data.token);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      toast({ title: "Welcome back!", description: `Signed in as ${data.username}` });
    },
    onError: (error) => {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials) => {
      const data = await apiClient.post('/api/auth/register', credentials);
      localStorage.setItem('token', data.token);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      toast({ title: "Account created!", description: "Welcome to CareCircle+" });
    },
    onError: (error) => {
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
      toast({ title: "Signed out", description: "See you next time." });
    },
  });

  return {
    user,
    isLoading,
    error,
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}



