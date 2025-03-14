import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signupUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    signupUser,
    signinUser,
    googleSignIn,
    user,
    loading,
    updateUser,
    logOut,
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) setLoading(false);
      console.log("Current User", currentUser);
    });
    return () => unSubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
