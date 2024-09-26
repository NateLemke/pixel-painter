import React, { useEffect, useState } from "react";
import { useDrawingContext } from "../context/DrawingContext";
import ModalHeader from "./modalHeader";

export default function ModalNew() {
    const {setModal, setDrawingID, setDrawingTitle,setDrawingMatrix} = useDrawingContext();

    const [title, setTitle] = useState("")
    const [size, setSize] = useState(20);
    const [red, setRed] = useState(255);
    const [green, setGreen] = useState(255);
    const [blue, setBlue] = useState(255);
    const [colour, setColour] = useState(null);
    const [error, setError] = useState("")

    const maxGrid = 50;
    const minGrid = 10;

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;

        if(title.length < 20 || newTitle.length < 20) {
            setTitle(newTitle);
        }
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

    const createDrawing = () => {
        if(!title) {
            setError("You must give a title");
            return;
        }
        if(size < minGrid || size > maxGrid) {
            setError(`Grid size must be between ${minGrid} and ${maxGrid}`);
            return;
        }

        let newDrawing = [];

        for(let i = 0; i < size; i++) {
            newDrawing.push(Array(Number(size)).fill(colour));
        }
        
        setDrawingID("");
        setDrawingTitle(title);
        setDrawingMatrix(newDrawing);

        setModal([]);
    }


    useEffect(() => {
        setColour(`rgb(${red},${green},${blue})`);
    },[red, green, blue]);


    return(
        <div className="absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center 
        items-center z-50">
            <div className="flex flex-1 flex-col justify-center items-center bg-zinc-800 
            sm:max-w-[25rem] max-w-[90%] rounded-lg text-zinc-500">
                <ModalHeader title={"Create New Drawing"}/>
                <h3 className="text-sm px-2 bg-zinc-800 translate-y-3">Drawing Properties</h3>
                <div className="flex flex-col justfy-center items-center p-2
                 border-zinc-500 border rounded-md pt-5">
                    <div id="titleDiv" className="flex flex-rows w-full justify-center items-center m-2">
                        <label htmlFor="titleInput">Title:</label>
                        <input type="text" id="titleInput" maxLength={20} value={title}
                        placeholder="Title" onChange={handleTitleChange}
                        className="ml-1 pl-1 text-black rounded-md"/>
                    </div>
                    <div id="sizeDiv" className="flex flex-rows w-full justify-center items-center m-2">
                        <label htmlFor="sizeInput">Grid Size:</label>
                        <input type="number" id="titleInput" max={50} min={10} value={size}
                        placeholder="Grid Size" onChange={(e) => setSize(e.target.value)}
                        className="ml-1 pl-1 text-black rounded-md"/>
                    </div>
                </div>
                <h3 className="text-sm px-2 bg-zinc-800 translate-y-5">Background Colour</h3>
                <div id="colourDiv" className="flex flex-rows w-11/12 justify-center items-center m-2 p-2
                 border-zinc-500 border rounded-md pt-5">
                    <div className="w-5 h-5 border border-white mr-2" style={{backgroundColor:colour}}/>
                    <div className="flex sm:flex-row flex-col gap-1 items-end">
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
                <h3 className="text-red-700">{error}</h3>
                <div id="createButton" className="p-2 mb-2 bg-zinc-600 hover:bg-zinc-700 cursor-pointer
                rounded-md ml-auto mr-5" onClick={createDrawing}>
                    <h3 className="text-white">Create</h3>
                </div>
            </div>
        </div>
    );
}