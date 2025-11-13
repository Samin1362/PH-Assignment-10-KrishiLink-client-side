import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };

  const register = async (email, password, displayName, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName || photoURL) {
      const profileData = {};
      if (displayName) profileData.displayName = displayName;
      if (photoURL) profileData.photoURL = photoURL;
      await updateProfile(result.user, profileData);
    }
    return result;
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    googleSignIn,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
