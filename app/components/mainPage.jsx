import React from "react";
import { useAuth } from "../context/AuthContext";

export default function MainPage() {
    const {currentUser} = useAuth();

    return(
        <div id="loginContainer" className="w-full h-full flex justify-center items-center bg-green-300">
            <h1>{currentUser.uid}</h1>
        </div>
    );
}