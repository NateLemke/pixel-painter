import React from "react";
import LoginHeader from "./loginHeader";
import LoginWindow from "./loginWindow";

export default function LoginPage() {
    return(
        <div id="loginContainer" className="w-full h-full flex justify-center items-center">
            <LoginHeader/>
            <LoginWindow/>
        </div>
    );
}