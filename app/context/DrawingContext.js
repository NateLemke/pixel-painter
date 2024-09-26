"use client";
import { useContext, useState, useEffect, createContext } from "react";

const DrawingContext = createContext();

export function useDrawingContext() {
    return useContext(DrawingContext);
}

export function DrawingProvider({children}) {
    const [drawingID, setDrawingID] = useState("");
    const [drawingTitle, setDrawingTitle] = useState("Untitled");
    const [drawingMatrix, setDrawingMatrix] = useState(null);

    const [brushColour, setBrushColour] = useState("rgb(0,0,0)");
    const [brushSize, setBrushSize] = useState("small");

    const [modal, setModal] = useState([]);

    const value = {
        drawingID, setDrawingID,
        drawingTitle, setDrawingTitle,
        drawingMatrix, setDrawingMatrix,
        brushColour, setBrushColour,
        brushSize, setBrushSize,
        modal, setModal,
    }

    // useEffect(() => {
    //     if(drawingMatrix) {
    //         console.log(drawingMatrix);
    //     }
    // }, [drawingMatrix]);

    useEffect(() => {
        let newDrawing = [];

        for(let i = 0; i < 20; i++) {
            newDrawing.push(Array(20).fill("rgb(255,255,255)"));
        }

        setDrawingMatrix(newDrawing);
    }, [])

    return (
        <DrawingContext.Provider value={value}>
            {children}
        </DrawingContext.Provider>
    )
}