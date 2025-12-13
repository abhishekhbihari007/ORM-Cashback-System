"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthUser, UserRole } from "@/lib/types";
import { authApi, clearTokens, getAccessToken } from "@/lib/backend-api";

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Map backend user payload to frontend role
function mapBackendRole(backendUser: any): UserRole {
  if (backendUser?.is_staff || backendUser?.is_superuser) return 'admin';
  if (backendUser?.role === 'BRAND') return 'brand';
  return 'user';
}

// Convert backend user to frontend AuthUser
function convertBackendUser(backendUser: any): AuthUser {
  return {
    id: String(backendUser.id),
    name: `${backendUser.first_name || ''} ${backendUser.last_name || ''}`.trim() || backendUser.email,
    email: backendUser.email,
    role: mapBackendRole(backendUser),
    balance: 0, // Will be fetched from wallet endpoint if needed
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const persistUser = (nextUser: AuthUser | null) => {
    setUser(nextUser);

    if (typeof window !== "undefined") {
      if (nextUser) {
        const userJson = JSON.stringify(nextUser);
        localStorage.setItem("auth_user", userJson);
        document.cookie = `auth_user=${userJson}; path=/; max-age=86400`;
      } else {
        localStorage.removeItem("auth_user");
        document.cookie = "auth_user=; path=/; max-age=0";
      }
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      const response = await authApi.login(email, password);
      const mappedUser = convertBackendUser(response.user);
      persistUser(mappedUser);

      const redirectRole = mappedUser.role || role;
      switch (redirectRole) {
        case "brand":
          router.push("/dashboard");
          break;
        case "admin":
          router.push("/admin");
          break;
        case "user":
        default:
          router.push("/user");
          break;
      }
    } catch (error: any) {
      clearTokens();
      persistUser(null);
      throw new Error(error.message || "Login failed. Please try again.");
    }
  };

  const logout = () => {
    authApi.logout();
    persistUser(null);
    router.push("/login");
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    persistUser(updatedUser);
  };

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      if (typeof window === "undefined") return;
      
      setIsLoading(true);
      
      if (!getAccessToken()) {
        persistUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await authApi.getCurrentUser();
        const mappedUser = convertBackendUser(response.user);
        persistUser(mappedUser);
      } catch (error) {
        clearTokens();
        persistUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

