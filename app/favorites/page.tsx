//app/favorites/page.tsx;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllPsychologists, sortPsychologists } from "@/lib/psychologists";
import PsychologistList from "@/components/psychologists/PsychologistList";
import Filter from "@/components/psychologists/Filter";
import Loader from "@/components/ui/Loader";
import { Psychologist, FilterValue } from "@/types";

export default function FavoritesPage() {
  const { favorites, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // State
  const [favoritePsychologists, setFavoritePsychologists] = useState<
    Psychologist[]
  >([]);
  const [displayedPsychologists, setDisplayedPsychologists] = useState<
    Psychologist[]
  >([]);
  const [filterValue, setFilterValue] = useState<FilterValue>("default");
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authorised
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, router]);

  // Loading selected psychologists
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      try {
        // Get all the psychologists
        const allPsychologists = await getAllPsychologists();
        // We filter only selected
        const filtered = allPsychologists.filter((p) =>
          favorites.includes(p.id)
        );
        setFavoritePsychologists(filtered);
        setDisplayedPsychologists(filtered);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites, isAuthenticated]);

  // Sorting
  useEffect(() => {
    const sorted =
      filterValue === "default"
        ? favoritePsychologists
        : sortPsychologists(favoritePsychologists, filterValue);
    setDisplayedPsychologists(sorted);
  }, [filterValue, favoritePsychologists]);

  // Filter change handler
  const handleFilterChange = (value: FilterValue) => {
    setFilterValue(value);
  };

  // Showing Loader
  if (authLoading || isLoading) {
    return (
      <section className="py-10 sm:py-16 min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4">
          <Loader />
        </div>
      </section>
    );
  }

  // If not authorised — do not render
  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="py-10 sm:py-16 min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-[40px] font-medium text-[#191a15] mb-6 sm:mb-8">
          Favorites
        </h1>

        {/* If there are no selections */}
        {favoritePsychologists.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[300px] bg-white rounded-3xl">
            <p className="text-lg text-[#8a8a89] text-center">
              Ви ще не додали жодного психолога до обраних
            </p>
          </div>
        ) : (
          <>
            {/* Filter */}
            <Filter value={filterValue} onChange={handleFilterChange} />

            {/* List */}
            <PsychologistList psychologists={displayedPsychologists} />
          </>
        )}
      </div>
    </section>
  );
}
