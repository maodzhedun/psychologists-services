"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Psychologist } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { addToFavorites, removeFromFavorites } from "@/lib/favorites";
import AppointmentModal from "@/components/modals/AppointmentModal";

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    id,
    name,
    avatar_url,
    experience,
    reviews,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
  } = psychologist;

  // Info chips data
  const infoChips = [
    { label: "Experience:", value: experience },
    { label: "License:", value: license },
    { label: "Specialization:", value: specialization },
    { label: "Initial_consultation:", value: initial_consultation },
  ];

  const { user, favorites, updateFavorites, isAuthenticated } = useAuth();

  // Check if psychologist is in favorites
  const isFavorite = favorites.includes(id);

  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  // Heart click handler
  const handleFavoriteClick = async () => {
    if (!isAuthenticated || !user) {
      alert("Для додавання в обрані потрібно авторизуватися");
      return;
    }

    try {
      if (isFavorite) {
        const newFavorites = await removeFromFavorites(user.uid, id);
        updateFavorites(newFavorites);
      } else {
        const newFavorites = await addToFavorites(user.uid, id);
        updateFavorites(newFavorites);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <article className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-3xl">
      {/* ===== AVATAR ===== */}
      <div className="flex-shrink-0">
        <div className="relative w-[120px] h-[120px] p-3 border-2 border-[#54be96] rounded-xl">
          <Image
            src={avatar_url}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Online indicator */}
          <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#38cd3e] border-[3px] border-white rounded-full" />
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-base text-[#8a8a89]">Psychologist</span>
            <h3 className="text-xl sm:text-2xl font-medium text-[#191a15]">
              {name}
            </h3>
          </div>

          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            {/* Statistics */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-2 text-base text-[#191a15]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1L10.163 5.37912L15 6.07912L11.5 9.48838L12.326 14.3L8 12.0191L3.674 14.3L4.5 9.48838L1 6.07912L5.837 5.37912L8 1Z"
                    fill="#FFC531"
                  />
                </svg>
                Rating: {rating}
              </span>
              <span className="text-[#191a15]/20">|</span>
              <span className="text-base text-[#191a15]">
                Price / 1 hour:{" "}
                <span className="text-[#38cd3e] font-medium">
                  {price_per_hour}$
                </span>
              </span>
            </div>

            {/* Heart button */}
            <button
              type="button"
              className={`w-10 h-10 flex items-center justify-center transition-all hover:scale-110 ${
                isFavorite
                  ? "text-[#54be96]"
                  : "text-[#191a15] hover:text-[#54be96]"
              }`}
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M22.75 9.10833C22.75 10.5942 22.1604 12.0192 21.1133 13.0692L13 21.1667L4.88667 13.0692C3.83958 12.0192 3.25 10.5942 3.25 9.10833C3.25 7.6225 3.83958 6.1975 4.88667 5.14749C5.93375 4.09749 7.35517 3.50665 8.8375 3.50665C10.3198 3.50665 11.7412 4.09749 12.7883 5.14749L13 5.35916L13.2117 5.14749C14.2588 4.09749 15.6802 3.50665 17.1625 3.50665C18.6448 3.50665 20.0663 4.09749 21.1133 5.14749C22.1604 6.1975 22.75 7.6225 22.75 9.10833Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ===== INFO CHIPS ===== */}
        <div className="flex flex-wrap gap-2 mb-6">
          {infoChips.map((chip, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-4 py-2 bg-[#f3f3f3] rounded-full text-sm"
            >
              <span className="text-[#8a8a89]">{chip.label}</span>
              <span className="text-[#191a15]">{chip.value}</span>
            </span>
          ))}
        </div>

        {/* About */}
        <p className="text-base text-[#191a15]/50 mb-4 leading-relaxed">
          {about}
        </p>

        {/* Read More Button */}
        {!isExpanded && (
          <button
            type="button"
            className="text-base font-medium text-[#191a15] underline hover:text-[#54be96] transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

        {/* ===== EXPANDED CONTENT ===== */}
        {isExpanded && (
          <div className="mt-8">
            {/* Reviews */}
            <ul className="flex flex-col gap-6 mb-10">
              {reviews.map((review, index) => (
                <li key={index} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 flex items-center justify-center bg-[#54be96]/10 text-[#54be96] font-medium text-xl rounded-full">
                      {review.reviewer.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-[#191a15]">
                        {review.reviewer}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-[#191a15]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8 1L10.163 5.37912L15 6.07912L11.5 9.48838L12.326 14.3L8 12.0191L3.674 14.3L4.5 9.48838L1 6.07912L5.837 5.37912L8 1Z"
                            fill="#FFC531"
                          />
                        </svg>
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-base text-[#191a15]/50 leading-relaxed">
                    {review.comment}
                  </p>
                </li>
              ))}
            </ul>

            {/* Make appointment button */}
            <Button onClick={() => setIsAppointmentOpen(true)}>
              Make an appointment
            </Button>
          </div>
        )}
      </div>
      
      {/* ===== APPOINTMENT MODAL ===== */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        psychologist={psychologist}
      />
    </article>
  );
}
