"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "app/components/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

const registerUser = async (values, setUser) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const user = userCredential.user;
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

const loginUser = async (values, setUser) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const user = userCredential.user;
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

const logout = async (setUser) => {
  try {
    await signOut(auth);
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

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          logged: true,
          email: authUser.email,
          uid: authUser.uid,
        });
      } else {
        setUser({
          logged: false,
          email: null,
          uid: null,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user.logged,
        registerUser: (values) => registerUser(values, setUser),
        loginUser: (values) => loginUser(values, setUser),
        logout: () => logout(setUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

