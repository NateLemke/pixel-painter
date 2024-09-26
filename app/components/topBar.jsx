import { useAmp } from "next/amp";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDrawingContext } from "../context/DrawingContext";
import { MdEdit } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import DropDown from "./dropDown";

export default function TopBar() {
    const {logOut} = useAuth();
    const {drawingTitle, setDrawingTitle} = useDrawingContext();

    const[editing, setEditing] = useState(false);
    const[showingMenu,setShowingMenu] = useState(false);

    const inputRef = useRef();

    const toggleMenu = () => {
        setShowingMenu((cur) => !cur);
    }

    const closeMenu = () => {
        setShowingMenu(false);
    }

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;

        if(drawingTitle.length < 20 || newTitle.length < 20) {
            setDrawingTitle(newTitle);
        }
    }

    useEffect(() => {
        if(editing) {
            inputRef.current.focus();
        }
    },[editing]);

    return(
        <div id="topBar" className="w-full h-7 top-0 z-50 sm:mt-5">
            <DropDown className="z-20" menuShowing={showingMenu} closeMenu = {closeMenu}/>
            <div className="relative w-full h-full justify-between items-center
            flex flex-row px-1 z-30 bg-zinc-700">
                <h2 className="cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-2 z-30" 
                onClick={toggleMenu}>File</h2>
                <div id="titleCard" className="trapezoid sm:w-72 w-52 min-h-10 bg-zinc-700 top-0 flex 
                flex-row justify-center items-center pt-2">
                    { !editing && <h2 className="ml-2">{drawingTitle}</h2>}
                    { editing && <input type="text" value={drawingTitle} 
                    onChange={handleTitleChange}
                    className={`bg-zinc-700 text-center focus:outline-none sm:max-w-48 max-w-32`}
                    ref={inputRef}/>}
                    { !editing && <MdEdit className="ml-2 hover:scale-125 hover:opacity-50 
                    duration-150 cursor-pointer" onClick={() => setEditing(true)}/>}
                    { editing && <IoMdCheckmark className="ml-2 hover:scale-125 hover:opacity-50 
                    duration-150 cursor-pointer" onClick={() => setEditing(false)}/>}
                </div>
                <h2 className="cursor-pointer hover:bg-zinc-800 px-2" onClick={logOut}>Exit</h2>
            </div>
        </div>
    );
}