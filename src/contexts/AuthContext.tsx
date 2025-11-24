"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthUser, UserRole } from "@/lib/types";

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for each role
const mockUsers: Record<UserRole, AuthUser> = {
  user: {
    id: "user-1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "user",
    balance: 1200,
  },
  brand: {
    id: "brand-1",
    name: "Varun Brand",
    email: "varun@example.com",
    role: "brand",
    balance: 50000,
  },
  admin: {
    id: "admin-1",
    name: "Priya Admin",
    email: "priya@example.com",
    role: "admin",
    balance: 0,
  },
  enterprise: {
    id: "enterprise-1",
    name: "Arjun Enterprise",
    email: "arjun@example.com",
    role: "enterprise",
    balance: 250000,
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
    // Enterprise feature hidden for now - will be enabled after launch
    switch (role) {
      case "user":
        router.push("/user");
        break;
      case "brand":
        router.push("/dashboard");
        break;
      case "admin":
        router.push("/admin");
        break;
      // case "enterprise":
      //   router.push("/enterprise");
      //   break;
      default:
        break;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user");
    }
    router.push("/login");
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update localStorage and cookie
    if (typeof window !== "undefined") {
      const userJson = JSON.stringify(updatedUser);
      localStorage.setItem("auth_user", userJson);
      document.cookie = `auth_user=${userJson}; path=/; max-age=86400`;
    }
  };

  // Load user from localStorage on mount and sync with cookie
  // This is necessary for persistence - disabling eslint rule
  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          setUser(userData);
          // Sync with cookie for middleware
          document.cookie = `auth_user=${stored}; path=/; max-age=86400`;
        } catch {
          // Invalid stored data - clear it
          localStorage.removeItem("auth_user");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
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

