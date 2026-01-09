import { ref, get } from "firebase/database";
import { database } from "./firebase";
import { Psychologist, FilterValue } from "@/types";

/**
 * Get all psychologists from Firebase
 */
export const getAllPsychologists = async (): Promise<Psychologist[]> => {
  try {
    const snapshot = await get(ref(database, "psychologists"));

    if (snapshot.exists()) {
      const data = snapshot.val();
      // Converting an object into an array with id
      return Object.entries(data).map(([key, value]) => ({
        id: key,
        ...(value as Omit<Psychologist, "id">),
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching psychologists:", error);
    return [];
  }
};

/**
 * Get one psychologist by ID
 */
export const getPsychologistById = async (
  id: string
): Promise<Psychologist | null> => {
  try {
    const snapshot = await get(ref(database, `psychologists/${id}`));

    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    }

    return null;
  } catch (error) {
    console.error("Error fetching psychologist:", error);
    return null;
  }
};

/**
 * Sorting psychologists
 */
export const sortPsychologists = (
  psychologists: Psychologist[],
  sortType: FilterValue
): Psychologist[] => {
  const sorted = [...psychologists];

  switch (sortType) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return sorted.sort((a, b) => a.price_per_hour - b.price_per_hour);
    case "price-desc":
      return sorted.sort((a, b) => b.price_per_hour - a.price_per_hour);
    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};
