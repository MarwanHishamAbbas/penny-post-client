"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User, authApi } from "../api/auth-api";
import { ApiError } from "@/src/shared/lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: (logoutAll?: boolean) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check auth status on mount and route changes
  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const response = await authApi.getCurrentUser();
      setUser(response.data.user);
    } catch (error: unknown) {
      // Clear user on auth error
      console.log(error)
      setUser(null);

      // Only log non-401 errors (401 is normal when not logged in)
      if ((error as ApiError)?.status !== 401) {
        console.error("Auth check failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (logoutAll: boolean = false) => {
    try {
      await authApi.logout(logoutAll);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/auth/login");
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    setUser,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}