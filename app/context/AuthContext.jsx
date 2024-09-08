"use client";

import { auth } from "app/components/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Función para registrar al usuario
const registerUser = async (values, setUser) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const user = userCredential.user;

    // Actualizar el estado del usuario
    setUser({
      logged: true,
      email: user.email,
      uid: user.uid,
    });

    console.log("Usuario registrado:", user);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
};

// Función para iniciar sesión
const loginUser = async (values, setUser) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const user = userCredential.user;

    // Actualizar el estado del usuario
    setUser({
      logged: true,
      email: user.email,
      uid: user.uid,
    });

    console.log("Usuario logueado:", user);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

// Función para cerrar sesión
const logout = async (setUser) => {
  try {
    await signOut(auth);

    // Restablecer el estado del usuario
    setUser({
      logged: false,
      email: null,
      uid: null,
    });

    console.log("Usuario deslogueado");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

// Custom hook para usar el contexto
export const useAuthContext = () => useContext(AuthContext);

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser: (values) => registerUser(values, setUser),
        loginUser: (values) => loginUser(values, setUser),
        logout: () => logout(setUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
