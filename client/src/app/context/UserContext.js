"use client"
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import {auth} from  '../firebase';
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext()

export const UserProvider = ( {children} ) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ uid: user.uid, username: user.displayName})
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext);