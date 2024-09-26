import React, { useEffect, useState } from "react";
import { useDrawingContext } from "../context/DrawingContext";

export default function CustomColourOption({colour, index, selectedIndex, setSelected}) {
    const [isSelected, setIsSelected] = useState(index === selectedIndex);

    const {setBrushColour} = useDrawingContext()

    const handleClick = () => {
        setBrushColour(colour);
        setSelected(index);
    }

    useEffect(() => {
        setIsSelected(index === selectedIndex);
    },[selectedIndex])

    return(
        <div className={`flex justify-center items-center aspect-square w-10 mr-2  hover:bg-zinc-600 
        ${isSelected?"bg-zinc-700":"bg-zinc-800"} rounded-md`} onClick={handleClick}>
            <div className="w-5 h-5 border border-white" style={{backgroundColor:colour}}/>
        </div>
    );
}