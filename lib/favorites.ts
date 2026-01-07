import { ref, get, set } from "firebase/database";
import { database } from "./firebase";

/**
 * Getting a list of favourites from Firebase
 */
export const getFavoritesFromDB = async (userId: string): Promise<string[]> => {
  const snapshot = await get(ref(database, `users/${userId}/favorites`));

  if (snapshot.exists()) {
    return snapshot.val() || [];
  }

  return [];
};

/**
 * Saving a list of favourites in Firebase
 */
export const saveFavoritesToDB = async (
  userId: string,
  favorites: string[]
): Promise<void> => {
  await set(ref(database, `users/${userId}/favorites`), favorites);
};

/**
 * Add psychologist to favourites
 */
export const addToFavorites = async (
  userId: string,
  psychologistId: string
): Promise<string[]> => {
  const favorites = await getFavoritesFromDB(userId);

  if (!favorites.includes(psychologistId)) {
    const updatedFavorites = [...favorites, psychologistId];
    await saveFavoritesToDB(userId, updatedFavorites);
    return updatedFavorites;
  }

  return favorites;
};

/**
 *Removing a psychologist from your favourites
 */
export const removeFromFavorites = async (
  userId: string,
  psychologistId: string
): Promise<string[]> => {
  const favorites = await getFavoritesFromDB(userId);
  const updatedFavorites = favorites.filter((id) => id !== psychologistId);
  await saveFavoritesToDB(userId, updatedFavorites);
  return updatedFavorites;
};
