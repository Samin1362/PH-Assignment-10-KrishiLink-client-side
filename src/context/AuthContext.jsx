import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async() => {
    await signOut(auth);
    setUser(null);
  }

  const value = {
    user,
    loading,
    login, 
    logout
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
