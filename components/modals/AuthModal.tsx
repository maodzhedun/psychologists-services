"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser, loginUser, getFirebaseErrorMessage } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import * as yup from "yup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "register" | null;
  onSwitchType: (type: "login" | "register") => void;
}

// General type for form
interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  type,
  onSwitchType,
}: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLogin = type === "login";
  const schema = isLogin ? loginSchema : registerSchema;

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema as yup.ObjectSchema<AuthFormData>),
    mode: "onBlur",
  });

  // Discard form when changing type
  useEffect(() => {
    reset();
    setError(null);
  }, [type, reset]);

  // Form submission handler
  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await loginUser({ email: data.email, password: data.password });
      } else {
        await registerUser({
          name: data.name || "",
          email: data.email,
          password: data.password,
        });
      }
      reset();
      onClose();
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      setError(getFirebaseErrorMessage(firebaseError.code || ""));
    } finally {
      setIsLoading(false);
    }
  };

  // Closing the modal
  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  // Switch between Login/Register
  const handleSwitchType = () => {
    reset();
    setError(null);
    onSwitchType(isLogin ? "register" : "login");
  };

  const title = isLogin ? "Log In" : "Registration";
  const description = isLogin
    ? "Welcome back! Please enter your credentials to access your account and continue your search for a psychologist."
    : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      {/* Description */}
      <p className="text-base text-[#191a15]/50 mb-10">{description}</p>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name (for registration only) */}
        {!isLogin && (
          <Input
            placeholder="Name"
            {...register("name")}
            error={errors.name?.message}
          />
        )}

        {/* Email */}
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />

        {/* Password */}
        <Input
          placeholder="Password"
          showPasswordToggle
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Submit */}
        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
        </Button>
      </form>

      {/* Switch */}
      <p className="mt-6 text-center text-sm text-[#8a8a89]">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          className="text-[#54be96] font-medium hover:underline"
          onClick={handleSwitchType}
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </Modal>
  );
}
