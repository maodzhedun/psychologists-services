"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { addToFavorites, removeFromFavorites } from "@/lib/favorites";
import AppointmentModal from "@/components/modals/AppointmentModal";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import { Psychologist } from "@/types";
import Icon from "../ui/Icon";

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const { user, favorites, updateFavorites, isAuthenticated } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

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

  // Перевіряємо чи психолог в обраних
  const isFavorite = favorites.includes(id);

  // Обробник кліку на серце
  const handleFavoriteClick = async () => {
    // Якщо не авторизований — показуємо повідомлення
    if (!isAuthenticated || !user) {
      setToast({ message: "Please log in to add to favorites", type: "info" });
      return;
    }

    try {
      if (isFavorite) {
        // Видаляємо з обраних
        const newFavorites = await removeFromFavorites(user.uid, id);
        updateFavorites(newFavorites);
      } else {
        // Додаємо до обраних
        const newFavorites = await addToFavorites(user.uid, id);
        updateFavorites(newFavorites);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // Info chips data
  const infoChips = [
    { label: "Experience:", value: experience },
    { label: "License:", value: license },
    { label: "Specialization:", value: specialization },
    { label: "Initial_consultation:", value: initial_consultation },
  ];

  return (
    <article className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-3xl transition-shadow duration-300 hover:shadow-lg">
      {/* ===== AVATAR ===== */}
      <div className="flex-shrink-0">
        <div className="relative w-[120px] h-[120px] p-3 border-2 border-[#54be96] rounded-xl">
          <Image
            src={avatar_url}
            alt={name}
            fill
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Індикатор онлайн */}
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
            {/* Статистика */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-2 text-base text-[#191a15]">
                <Icon name="star" size={16} />
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

            {/* Кнопка серця */}
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
              <Icon name={isFavorite ? "heart-filled" : "heart"} size={26} />
            </button>
          </div>
        </div>

        {/* Info Chips */}
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
          <div className="mt-8 animate-fadeIn">
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
                        <Icon name="star" size={16} />
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

            {/* Кнопка запису */}
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

      {/* ===== TOAST ===== */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isOpen={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </article>
  );
}
