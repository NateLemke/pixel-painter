import React from "react";
import { FaPaintBrush } from "react-icons/fa";
import { Outfit } from "next/font/google";
import { Knewave } from "next/font/google";


const font = Knewave({ weight: '400',subsets: ["latin"] });

export default function LoginHeader() {
    return(
        <div id="HeaderContainer" className={`w-full h-10 absolute top-0 border-white 
        border-b flex items-center ${font.className}`}>
            <FaPaintBrush className="text-2xl ml-2"/><h1 className="text-2xl">Pixel Painter</h1>
        </div>
    );
}