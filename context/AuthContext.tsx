"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthChange } from "@/lib/auth";
import { getFavoritesFromDB } from "@/lib/favorites";
import { AuthContextType, User } from "@/types";

// Створюємо контекст
const AuthContext = createContext<AuthContextType | null>(null);

// Хук для використання контексту
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider компонент
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true); // ← Змінено на isLoading

  // Слухаємо зміни стану авторизації
  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser: User | null) => {
      // ← User, не FirebaseUser
      if (authUser) {
        // Користувач авторизований
        setUser(authUser);

        // Завантажуємо обрані
        try {
          const userFavorites = await getFavoritesFromDB(authUser.uid);
          setFavorites(userFavorites || []);
        } catch (error) {
          console.error("Error loading favorites:", error);
          setFavorites([]);
        }
      } else {
        // Користувач не авторизований
        setUser(null);
        setFavorites([]);
      }

      setIsLoading(false); // ← Змінено
    });

    // Відписуємось при розмонтуванні
    return () => unsubscribe();
  }, []);

  // Оновлення обраних
  const updateFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
  };

  // Значення контексту
  const value: AuthContextType = {
    user,
    favorites,
    isLoading, // ← Змінено з loading
    isAuthenticated: !!user,
    updateFavorites,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
