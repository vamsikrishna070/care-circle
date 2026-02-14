import React from "react";
import { useState, useEffect, useCallback } from "react";
import { io, } from "socket.io-client";
import { useToast } from "@/hooks/use-toast";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';









export function useChat() {
  const { toast } = useToast();
  const [socket, setSocket] = useState(null);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const newSocket = io(SOCKET_URL, {
      auth: { token },
      autoConnect: false,
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
      setActiveSessionId(null);
      setIsSearching(false);
    });

    newSocket.on('waiting', ({ message }) => {
      setIsSearching(true);
      toast({ title: "Searching", description: message });
    });

    newSocket.on('partner-found', ({ sessionId }) => {
      setActiveSessionId(sessionId);
      setIsSearching(false);
      setMessages([]);
      toast({ title: "Connected", description: "You are now connected with a support partner." });
    });

    newSocket.on('new-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('session-ended', () => {
      toast({ title: "Session Ended", description: "The chat session has ended." });
      setActiveSessionId(null);
      setMessages([]);
    });

    newSocket.on('partner-disconnected', () => {
      toast({ title: "Partner Disconnected", description: "Your partner has left the chat.", variant: "destructive" });
      setActiveSessionId(null);
      setMessages([]);
    });

    newSocket.on('error', ({ message }) => {
      toast({ title: "Error", description: message, variant: "destructive" });
      setIsSearching(false);
    });

    newSocket.on('waiting-cancelled', () => {
      setIsSearching(false);
    });

    newSocket.connect();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [toast]);

  // Find match
  const findMatch = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('find-partner');
    }
  }, [socket, isConnected]);

  // Cancel search
  const cancelSearch = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('cancel-waiting');
      setIsSearching(false);
    }
  }, [socket, isConnected]);

  // Send message
  const sendMessage = useCallback((content) => {
    if (socket && activeSessionId && content.trim()) {
      socket.emit('send-message', {
        sessionId: activeSessionId,
        content: content.trim(),
      });
    }
  }, [socket, activeSessionId]);

  // End session
  const endSession = useCallback(() => {
    if (socket && activeSessionId) {
      socket.emit('end-session', { sessionId: activeSessionId });
      setActiveSessionId(null);
      setMessages([]);
    }
  }, [socket, activeSessionId]);

  return {
    activeSessionId,
    messages,
    isSearching,
    isConnected,
    findMatch,
    cancelSearch,
    sendMessage,
    endSession,
  };
}



