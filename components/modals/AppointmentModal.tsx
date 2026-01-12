"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "@/lib/validations";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Psychologist, AppointmentFormData } from "@/types";
import Image from "next/image";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  psychologist: Psychologist;
}

// Available time slots
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export default function AppointmentModal({
  isOpen,
  onClose,
  psychologist,
}: AppointmentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const timeDropdownRef = useRef<HTMLDivElement>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
    mode: "onBlur",
  });

  const selectedTime = watch("time");

  // Closing the dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timeDropdownRef.current &&
        !timeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTimeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Form submission handler
  const onSubmit = async (data: AppointmentFormData) => {
    setIsLoading(true);

    // API request simulation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Appointment data:", {
      ...data,
      psychologistId: psychologist.id,
      psychologistName: psychologist.name,
    });

    alert("Заявку на зустріч успішно відправлено!");
    reset();
    setIsLoading(false);
    onClose();
  };

  // Close modal
  const handleClose = () => {
    reset();
    setIsTimeDropdownOpen(false);
    onClose();
  };

  // Choose time
  const handleTimeSelect = (time: string) => {
    setValue("time", time, { shouldValidate: true });
    setIsTimeDropdownOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Make an appointment with a psychologist"
    >
      {/* Description */}
      <p className="text-base text-[#191a15]/50 mb-10">
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      {/* Information about psychologist */}
      <div className="flex items-center gap-3 mb-10">
        <Image
          src={psychologist.avatar_url}
          alt={psychologist.name}
          width={44}
          height={44}
          className="w-11 h-11 rounded-xl object-cover"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-[#8a8a89]">Your psychologist</span>
          <span className="font-medium text-[#191a15]">
            {psychologist.name}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <Input
          placeholder="Name"
          {...register("name")}
          error={errors.name?.message}
        />

        {/* Phone & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <Input
            type="tel"
            placeholder="+380"
            {...register("phone")}
            error={errors.phone?.message}
          />

          {/* Time Dropdown */}
          <div ref={timeDropdownRef} className="relative">
            <button
              type="button"
              className={`
                w-full px-[18px] py-4 text-base text-left bg-white
                border rounded-xl transition-colors flex items-center justify-between
                ${errors.time ? "border-red-500" : "border-[#191a15]/20"}
                ${selectedTime ? "text-[#191a15]" : "text-[#191a15]/50"}
              `}
              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
            >
              <span>{selectedTime || "00:00"}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 5V10L13.3333 11.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="10"
                  cy="10"
                  r="7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isTimeDropdownOpen && (
              <ul className="absolute top-full left-0 right-0 mt-1 max-h-[200px] overflow-y-auto bg-white border border-[#191a15]/10 rounded-xl shadow-lg z-10">
                <li className="px-4 py-2 text-sm font-medium text-[#191a15] border-b border-[#191a15]/10">
                  Meeting time
                </li>
                {timeSlots.map((time) => (
                  <li key={time}>
                    <button
                      type="button"
                      className={`
                        w-full px-4 py-2.5 text-sm text-left transition-colors
                        hover:bg-[#f3f3f3]
                        ${
                          time === selectedTime
                            ? "text-[#54be96] font-medium"
                            : "text-[#191a15]/50"
                        }
                      `}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Hidden input for form */}
            <input type="hidden" {...register("time")} />
            {errors.time && (
              <span className="mt-1 text-xs text-red-500">
                {errors.time.message}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />

        {/* Comment */}
        <div className="flex flex-col">
          <textarea
            placeholder="Comment"
            rows={4}
            className={`
              w-full px-[18px] py-4 text-base text-[#191a15] bg-white
              border rounded-xl transition-colors resize-y min-h-[116px]
              placeholder:text-[#191a15]/50
              focus:outline-none focus:border-[#54be96]
              ${errors.comment ? "border-red-500" : "border-[#191a15]/20"}
            `}
            {...register("comment")}
          />
          {errors.comment && (
            <span className="mt-1 text-xs text-red-500">
              {errors.comment.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
          Send
        </Button>
      </form>
    </Modal>
  );
}
