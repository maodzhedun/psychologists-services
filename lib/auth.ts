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
import { User } from "@/types";

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
}): Promise<User> => {
  // Creating a user
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

  return {
    uid: user.uid,
    email: user.email,
    displayName: name,
  };
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
}): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    displayName: userCredential.user.displayName,
  };
};

/**
 * Log out from account
 */
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

/**
 * Authorisation state listener
 */
export const onAuthChange = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });
    } else {
      callback(null);
    }
  });
};

/**
 * Receiving Firebase error text
 */
export const getFirebaseErrorMessage = (code: string): string => {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "Цей email вже використовується",
    "auth/invalid-email": "Невірний формат email",
    "auth/weak-password": "Пароль занадто слабкий (мінімум 6 символів)",
    "auth/user-not-found": "Користувача не знайдено",
    "auth/wrong-password": "Невірний пароль",
    "auth/invalid-credential": "Невірний email або пароль",
    "auth/too-many-requests": "Забагато спроб. Спробуйте пізніше",
  };

  return errorMessages[code] || "Сталася помилка. Спробуйте ще раз";
};
