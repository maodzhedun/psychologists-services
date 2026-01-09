//app/psychologist/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { getAllPsychologists, sortPsychologists } from '@/lib/psychologists';
import PsychologistList from '@/components/psychologists/PsychologistList';
import Filter from '@/components/psychologists/Filter';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { Psychologist, FilterValue } from '@/types';

const ITEMS_PER_PAGE = 3;

export default function PsychologistsPage() {
  // State
  const [allPsychologists, setAllPsychologists] = useState<Psychologist[]>([]);
  const [displayedPsychologists, setDisplayedPsychologists] = useState<
    Psychologist[]
  >([]);
  const [filterValue, setFilterValue] = useState<FilterValue>("default");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Loading psychologists during mounting
  useEffect(() => {
    const fetchPsychologists = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPsychologists();
        setAllPsychologists(data);
        setDisplayedPsychologists(data.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching psychologists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  // Filtering and pagination
  useEffect(() => {
    const sorted =
      filterValue === "default"
        ? allPsychologists
        : sortPsychologists(allPsychologists, filterValue);
    setDisplayedPsychologists(sorted.slice(0, visibleCount));
  }, [filterValue, allPsychologists, visibleCount]);

  // Filter change handler
  const handleFilterChange = (value: FilterValue) => {
    setFilterValue(value);
    setVisibleCount(ITEMS_PER_PAGE); // Скидаємо пагінацію
  };

  // ''Load more'' handler
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    // Simulation of loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    setIsLoadingMore(false);
  };

  // Are there still elements to load?
  const hasMore = visibleCount < allPsychologists.length;

  // Show Loader during loading
  if (isLoading) {
    return (
      <section className="py-10 sm:py-16 min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4">
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-16 min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4">
        {/* Flter */}
        <Filter value={filterValue} onChange={handleFilterChange} />

        {/* List of psychologists  */}
        <PsychologistList psychologists={displayedPsychologists} />

        {/* Button "Load more" */}
        {hasMore && (
          <div className="flex justify-center mt-10 sm:mt-16">
            <Button onClick={handleLoadMore} isLoading={isLoadingMore}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}