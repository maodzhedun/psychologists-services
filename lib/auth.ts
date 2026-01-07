import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "./firebase";

/**
 * New user registration
 */
export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  // Create a user
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Updating profile with name
  await updateProfile(user, { displayName: name });

  // Creating a record in the database
  await set(ref(database, `users/${user.uid}`), {
    name,
    email,
    favorites: [],
    createdAt: new Date().toISOString(),
  });

  return user;
};

/**
 * User login
 */
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

/**
 * Log out of  account
 */
export const logoutUser = async () => {
  await signOut(auth);
};

/**
 * Authorisation status listener
 */
export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Getting the Firebase error text
 */
export const getFirebaseErrorMessage = (code: string): string => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Цей email вже використовується";
    case "auth/invalid-email":
      return "Невірний формат email";
    case "auth/weak-password":
      return "Пароль занадто слабкий";
    case "auth/user-not-found":
      return "Користувача не знайдено";
    case "auth/wrong-password":
      return "Невірний пароль";
    case "auth/invalid-credential":
      return "Невірні облікові дані";
    default:
      return "Сталася помилка. Спробуйте ще раз";
  }
};
