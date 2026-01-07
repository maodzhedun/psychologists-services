import * as yup from "yup";

/**
 * Validation scheme for registration
 */
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Ім'я є обов'язковим")
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(50, "Ім'я має містити максимум 50 символів"),
  email: yup
    .string()
    .required("Email є обов'язковим")
    .email("Введіть коректний email"),
  password: yup
    .string()
    .required("Пароль є обов'язковим")
    .min(6, "Пароль має містити мінімум 6 символів"),
});

/**
 * Validation scheme for login
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email є обов'язковим")
    .email("Введіть коректний email"),
  password: yup
    .string()
    .required("Пароль є обов'язковим")
    .min(6, "Пароль має містити мінімум 6 символів"),
});

/**
 * Validation scheme for booking a consultation
 */
export const appointmentSchema = yup.object().shape({
  name: yup
    .string()
    .required("Ім'я є обов'язковим")
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(50, "Ім'я має містити максимум 50 символів"),
  phone: yup
    .string()
    .required("Телефон є обов'язковим")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Введіть коректний номер телефону"
    ),
  email: yup
    .string()
    .required("Email є обов'язковим")
    .email("Введіть коректний email"),
  time: yup.string().required("Оберіть час зустрічі"),
  comment: yup
    .string()
    .required("Коментар є обов'язковим")
    .min(10, "Коментар має містити мінімум 10 символів")
    .max(500, "Коментар має містити максимум 500 символів"),
});
