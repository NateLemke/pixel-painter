import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginWindow() {
    
    const [loggingIn, setLoggingIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signIn,signUp} = useAuth()

    const submitHandler = async () => {
        if(!email || !password) {
            setErrorMessage("You must enter an email and password");
            return;
        }
        if(loggingIn) {
            try {
                await signIn(email, password);
            } catch(error) {
                console.error(error);
                setErrorMessage("Failed to Login");
            }
        } else {
            try {
                await signUp(email, password);
            } catch(error) {
                console.error(error);
                setErrorMessage("Failed to Register");
            }
        }
    }

    const guestLogin = async () => {
        try {
            await signIn("guest@user.com", "password");
        } catch(error) {
            console.error(error);
            setErrorMessage("Failed to Login");
        }
    }

    return(
        <div id="loginWindow" className="flex-1 flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl mb-5">{loggingIn ? "Login":"Sign Up"}</h1>
            <input type="text" className="w-full sm:max-w-[40ch] max-w-[30ch] outline-none text-black p-2 
            border-b-2 border-white focus:border-yellow-600 duration-300" 
            value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="w-full sm:max-w-[40ch] max-w-[30ch] outline-none text-black p-2 
            border-b-2 border-white focus:border-yellow-600 duration-300 mb-3" 
            value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button id="submitButton" onClick={submitHandler} className="w-full sm:max-w-[40ch] max-w-[30ch] 
            border-2 border-white p-1 relative overflow-hidden duration-300
            after:absolute after:w-full after:h-full after:bg-white after:z-10 after:right-full
            after:top-0 hover:after:translate-x-full hover:text-black after:duration-300">
                <h2 className="relative text-xl z-20">{loggingIn?"LOGIN":"REGISTER"}</h2>
            </button>
            <button id="switchButton" onClick={() => setLoggingIn((cur) => !cur)} 
            className="w-full sm:max-w-[40ch] max-w-[30ch] border-2 border-white p-1 relative 
            overflow-hidden duration-300 after:absolute after:w-full after:h-full after:bg-white 
            after:z-10 after:right-full after:top-0 hover:after:translate-x-full 
            hover:text-black after:duration-300">
                <h2 className="relative text-xl z-20">{loggingIn?"SIGN UP":"BACK TO LOGIN"}</h2>
            </button>
            {loggingIn && <button id="guestButton" onClick={guestLogin} className="w-full sm:max-w-[40ch] max-w-[30ch] 
            border-2 border-white p-1 relative overflow-hidden duration-300
            after:absolute after:w-full after:h-full after:bg-white after:z-10 after:right-full
            after:top-0 hover:after:translate-x-full hover:text-black after:duration-300">
                <h2 className="relative text-xl z-20">LOGIN AS GUEST</h2>
            </button>}
            <h2 id="errorText" className="text-xl text-red-600 border-red-600 border-b-2">
                {errorMessage}
            </h2>
        </div>
    );
}