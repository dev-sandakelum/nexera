// contexts/UserContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { NexeraUser } from '@/components/types';
import { guestUser } from '@/app/page';

type UserContextType = {
  user: NexeraUser;
  setUser: (user: NexeraUser) => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ 
  children, 
  initialUser 
}: { 
  children: ReactNode; 
  initialUser?: NexeraUser 
}) {
  const [user, setUser] = useState<NexeraUser>(initialUser || guestUser);
  const [isLoading, setIsLoading] = useState(false);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user", {
        cache: "no-store",
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (response.ok) {
        const userData = await response.json();
        if (userData) {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}