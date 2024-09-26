import React, {useState, useEffect} from "react";
import { useDrawingContext } from "../context/DrawingContext";
import Pixel from "./pixel";

export default function Canvas({gridSize}) {

    const [pixels, setPixels] = useState([]);

    const {drawingMatrix} = useDrawingContext();

    useEffect(() => {
        setPixels([]);
        if(drawingMatrix) {
            let newPixels = [];
            for(let y = 0; y < drawingMatrix.length; y++) {
                for(let x = 0; x < drawingMatrix[0].length; x++) {
                    newPixels.push(<Pixel colour={drawingMatrix[y][x]} xIndex={x} yIndex={y} 
                    max={gridSize-1} paintable={true}/>);
                }
            }

            setPixels(newPixels);
        }
    }, [drawingMatrix]);

    return(
        <div className="bg-zinc-600 aspect-square sm:h-5/6 max-sm:w-11/12 grid gap-px" 
                style={{gridTemplateColumns:`repeat(${gridSize},1fr)`}}>
            {pixels}
        </div>
    );
}