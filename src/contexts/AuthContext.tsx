"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthUser, UserRole } from "@/lib/types";

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for each role
const mockUsers: Record<UserRole, AuthUser> = {
  user: {
    id: "user-1",
    name: "John Shopper",
    email: "john@example.com",
    role: "user",
    balance: 1200,
  },
  brand: {
    id: "brand-1",
    name: "Acme Brand",
    email: "brand@example.com",
    role: "brand",
    balance: 50000,
  },
  admin: {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    balance: 0,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  const login = (role: UserRole) => {
    const mockUser = mockUsers[role];
    setUser(mockUser);
    
    // Store in localStorage and cookie for persistence
    if (typeof window !== "undefined") {
      const userJson = JSON.stringify(mockUser);
      localStorage.setItem("auth_user", userJson);
      // Set cookie for middleware
      document.cookie = `auth_user=${userJson}; path=/; max-age=86400`;
    }

    // Redirect based on role
    if (role === "user") {
      router.push("/user");
    } else if (role === "brand") {
      router.push("/dashboard");
    } else if (role === "admin") {
      router.push("/admin");
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user");
    }
    router.push("/login");
  };

  // Load user from localStorage on mount and sync with cookie
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          setUser(userData);
          // Sync with cookie for middleware
          document.cookie = `auth_user=${stored}; path=/; max-age=86400`;
        } catch (e) {
          // Invalid stored data
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

