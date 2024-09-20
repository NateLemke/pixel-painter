"use client";
import { useContext, useState, useEffect, useRef, createContext } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, 
    signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userInfo = useRef()

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        return;
    }

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return (signOut(auth));
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        userInfo,
        signIn,
        signUp,
        logOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}