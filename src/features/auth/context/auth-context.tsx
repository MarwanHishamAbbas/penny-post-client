// /src/features/auth/context/auth-context.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isLoggingOutRef = useRef(false);
  // ✅ Skip auth check on public routes
  const publicRoutes = ['/login', '/register', '/verify-email', '/', '/terms', '/privacy'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    // ✅ Skip checkAuth if we're in the logout process
    if (!isLoggingOutRef.current && !isPublicRoute) {
      checkAuth();
    }
  }, [pathname, isPublicRoute]); // This runs on EVERY route change!

  const checkAuth = async () => {
    // ✅ Double check here too
    if (isLoggingOutRef.current) return;

    setIsLoading(true);
    try {
      const response = await authApi.getCurrentUser();
      setUser(response.data.user);
    } catch (error: unknown) {
      // ✅ Only clear user if NOT logging out
      if (!isLoggingOutRef.current) {
        setUser(null);
      }

      if ((error as ApiError)?.status !== 401) {
        console.error("Auth check failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (logoutAll: boolean = false) => {
    // ✅ Set flag BEFORE doing anything
    isLoggingOutRef.current = true;
    setIsLoading(true); // Show loading state
    setUser(null); // Clear user immediately

    try {
      await authApi.logout(logoutAll);
    } catch (error) {
      console.log("Logout completed", error);
    } finally {
      setIsLoading(false);

      // ✅ Keep flag true longer (until after redirect)
      setTimeout(() => {
        isLoggingOutRef.current = false;
      }, 2000); // Increased to 2 seconds

      router.push("/login");
    }
  };

  const refreshUser = async () => {
    if (isLoggingOutRef.current) return;

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