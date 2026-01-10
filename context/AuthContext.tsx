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

// Creating context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook for using context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Listening for changes in authorisation status
  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser: User | null) => {
      if (authUser) {
        // User authorised
        setUser(authUser);

        // Download selected
        try {
          const userFavorites = await getFavoritesFromDB(authUser.uid);
          setFavorites(userFavorites || []);
        } catch (error) {
          console.error("Error loading favorites:", error);
          setFavorites([]);
        }
      } else {
        // User not authorised
        setUser(null);
        setFavorites([]);
      }

      setIsLoading(false);
    });

    // Unsubscribe when dismounting
    return () => unsubscribe();
  }, []);

  // Updating favourites
  const updateFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
  };

  // The meaning of context
  const value: AuthContextType = {
    user,
    favorites,
    isLoading,
    isAuthenticated: !!user,
    updateFavorites,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
