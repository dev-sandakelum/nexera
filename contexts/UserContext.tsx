"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { NexeraUser } from '@/components/types';
import { guestUser } from '@/app/page';
import { getUserFromClerk } from '@/lib/server/user-helpers';

interface UserContextType {
  user: NexeraUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  updateUser: (userData: Partial<NexeraUser>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, initialUser }: { children: ReactNode; initialUser?: NexeraUser }) {
  const [user, setUser] = useState<NexeraUser | null>(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);

  // Fetch user from API
  const fetchUser = useCallback(async () => {
    try {
      const user = await getUserFromClerk();
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(guestUser);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  // Update user locally (optimistic update)
  const updateUser = useCallback((userData: Partial<NexeraUser>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(guestUser);
  }, []);

  // Initial fetch if no initial user provided
  useEffect(() => {
    if (!initialUser) {
      fetchUser();
    }
  }, [initialUser, fetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}