"use client";

import PsychologistCard from "./PsychologistCard";
import { Psychologist } from "@/types";

interface PsychologistListProps {
  psychologists: Psychologist[];
}

export default function PsychologistList({
  psychologists,
}: PsychologistListProps) {
  // If the list is empty
  if (!psychologists || psychologists.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px] bg-white rounded-3xl">
        <p className="text-lg text-[#8a8a89]">Психологів не знайдено</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-8">
      {psychologists.map((psychologist) => (
        <li key={psychologist.id}>
          <PsychologistCard psychologist={psychologist} />
        </li>
      ))}
    </ul>
  );
}
