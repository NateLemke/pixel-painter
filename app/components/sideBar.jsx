import React, {useEffect, useState} from "react";
import { IoIosColorPalette } from "react-icons/io";
import { coloursArray } from "../data/colourData";
import ColourOption from "./colourOption";
import CustomColourOption from "./customColourOption";
import { useDrawingContext } from "../context/DrawingContext";

export default function SideBar() {

    const {setBrushSize} = useDrawingContext();

    const [showing, setShowing] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [selectedBrush, setSelectedBrush] = useState(0);
    const [colourElements, setColourElements] = useState([])

    const [red, setRed] = useState(255);
    const [green, setGreen] = useState(255);
    const [blue, setBlue] = useState(255);
    const [customColour, setCustomColour] = useState(null);

    const toggleSideBar = () => {
        setShowing((cur) => !cur);
    }

    const handleRed = (e) => {
        const val = e.target.value
        if(val < 0 || val > 255) {
            setError("RGB values must be between 0 and 255");
            return;
        }
        setRed(val);
    }

    const handleGreen= (e) => {
        const val = e.target.value
        if(val < 0 || val > 255) {
            setError("RGB values must be between 0 and 255");
            return;
        }
        setGreen(val);
    }

    const handleBlue = (e) => {
        const val = e.target.value
        if(val < 0 || val > 255) {
            setError("RGB values must be between 0 and 255");
            return;
        }
        setBlue(val);
    }

    const handleBrush = (size, newIndex) => {
        setBrushSize(size);
        setSelectedBrush(newIndex);
    }

    useEffect(() => {
        setCustomColour(`rgb(${red},${green},${blue})`);
    },[red, green, blue]);

    useEffect(() => {
        const colourElements = coloursArray.map((colour, index) => {
            return(<ColourOption key={index+1} colour={colour} index={index+1} 
                selectedIndex={selectedIndex} setSelected={setSelectedIndex}/>);
        });
        setColourElements(colourElements);
    },[selectedIndex])


    return(
        <div className={`flex flex-row h-full sm:w-1/4 ${showing?"w-full":"w-0"} max-sm:absolute 
        max-sm:left-0 z-40 duration-200`}>
            <div className={`flex flex-col duration-200 h-full sm:w-full ${showing?"w-11/12":"w-0"} 
            bg-zinc-800 items-center text-zinc-500`}>
                <div className={`flex-col items-center w-full h-full ${showing?"flex":"hidden"}
                 overflow-scroll no-scrollbar`}>
                    {/* Brush Menu */}
                    <h3 className="text-sm px-2 bg-zinc-800 translate-y-5">Brush Size</h3>
                    <div id="colourDiv" className="grid w-11/12 justify-center items-center mt-2 p-5
                    border-zinc-500 border rounded-md grid-cols-3">
                        <div className={`flex justify-center items-center aspect-square w-auto 
                         hover:bg-zinc-600 ${(selectedBrush === 0)?"bg-zinc-700":"bg-zinc-800"} 
                         rounded-md`} onClick={() => handleBrush("small", 0)}>
                            <div className="w-5 h-5 bg-black"/>
                        </div>
                        <div className={`flex justify-center items-center aspect-square w-auto 
                         hover:bg-zinc-600 ${(selectedBrush === 1)?"bg-zinc-700":"bg-zinc-800"} 
                         rounded-md`} onClick={() => handleBrush("medium", 1)}>
                            <div className="w-10 h-10 bg-black"/>
                        </div>
                        <div className={`flex justify-center items-center aspect-square w-auto 
                         hover:bg-zinc-600 ${(selectedBrush === 2)?"bg-zinc-700":"bg-zinc-800"} 
                         rounded-md`} onClick={() => handleBrush("large", 2)}>
                            <div className="w-16 h-16 bg-black"/>
                        </div>
                    </div>
                    {/* Custom Colour Menu */}
                    <h3 className="text-sm px-2 bg-zinc-800 translate-y-5">Custom Colour</h3>
                    <div id="colourDiv" className="flex flex-rows w-11/12 justify-center items-center m-2 p-2
                    border-zinc-500 border rounded-md pt-5">
                        <CustomColourOption colour={customColour} index={0} 
                        selectedIndex={selectedIndex} setSelected={setSelectedIndex}/>
                        <div className="flex flex-col gap-1 items-end">
                            <div className="flex flex-row gap-1" >
                                <label htmlFor="redInput">Red:</label>
                                <input type="number" id="titleInput" max={255} min={0} value={red}
                                placeholder="Red" onChange={handleRed}
                                className="ml-1 pl-1 text-black rounded-md max-w-[6ch]"/>
                            </div>
                            <div className="flex flex-row gap-1" >
                                <label htmlFor="greenInput">Green:</label>
                                <input type="number" id="titleInput" max={255} min={0} value={green}
                                placeholder="Green" onChange={handleGreen}
                                className="ml-1 pl-1 text-black rounded-md max-w-[6ch]"/>
                            </div>
                            <div className="flex flex-row gap-1" >
                                <label htmlFor="blueInput">Blue:</label>
                                <input type="number" id="titleInput" max={255} min={0} value={blue}
                                placeholder="Blue" onChange={handleBlue}
                                className="ml-1 pl-1 text-black rounded-md max-w-[6ch]"/>
                            </div>
                        </div>
                    </div>
                    {/* Colour Menu */}
                    <h3 className="text-sm px-2 bg-zinc-800 translate-y-3">Colours</h3>
                    <div className="grid w-11/12 justfy-center items-center p-5
                    border-zinc-500 border rounded-md grid-cols-4 mb-8">
                        {colourElements}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center sm:hidden mt-1 rounded-r-lg
            h-8 bg-zinc-800" onClick={toggleSideBar}>
                <IoIosColorPalette className="mx-2"/>
            </div>
        </div>
    );
}