import React from "react";
import { FaPaintBrush } from "react-icons/fa";

export default function LoginHeader() {
    return(
        <div id="HeaderContainer" className="w-full h-10 sticky top-0 border-white 
        border border-x-0 border-t-0 flex items-center">
            <FaPaintBrush className="text-2xl"/><h1 className="text-2xl">Pixel Painter</h1>
        </div>
    );
}