import React from "react";
import { useDrawingContext } from "../context/DrawingContext";

export default function ModalHeader({title}) {
    const {setModal} = useDrawingContext();
    
    return(
        <div className="w-11/12 border-b border-zinc-700 flex flex-row justify-center items-center
        relative rounde">
            <h1>{title}</h1>
            <h2 className="text-xl font-bold hover:scale-125 hover:opacity-50 absolute left-auto 
            right-0 cursor-pointer translate-x-1.5"
            onClick={() => setModal([])}>
                X
            </h2>
        </div>
    );
}