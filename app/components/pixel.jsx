import React, { useEffect, useState } from "react";
import { useDrawingContext } from "../context/DrawingContext";

export default function Pixel({colour, xIndex, yIndex, max, paintable}) {

    const [curColour, setCurColour] = useState(colour);
    const {drawingMatrix, setDrawingMatrix, brushColour, brushSize} = useDrawingContext();

    const brushStroke = (e) => {
        if(e.buttons == 1) {
            let newMatrix = [...drawingMatrix];
            
            if(brushSize === "small") {
                newMatrix[yIndex][xIndex] = brushColour;
            }
            else if (brushSize === "medium") {
                for(let yOffset = -1; yOffset <= 1; yOffset++) {
                    for(let xOffset = -1; xOffset <= 1; xOffset++) {
                        const y = yIndex + yOffset;
                        const x = xIndex + xOffset;
                        if((x >= 0 && x <= max)&&(y >= 0 && y <= max)) {
                            newMatrix[y][x] = brushColour;
                        }
                    }
                }
            }
            else if (brushSize === "large") {
                for(let yOffset = -2; yOffset <= 2; yOffset++) {
                    for(let xOffset = -2; xOffset <= 2; xOffset++) {
                        const y = yIndex + yOffset;
                        const x = xIndex + xOffset;
                        if((x >= 0 && x <= max)&&(y >= 0 && y <= max)) {
                            newMatrix[y][x] = brushColour;
                        }
                    }
                }
            }

            setDrawingMatrix(newMatrix);
        }
    }

    const paint = () => {
        let newMatrix = [...drawingMatrix];

        if(brushSize === "small") {
            newMatrix[yIndex][xIndex] = brushColour;
        }
        else if (brushSize === "medium") {
            for(let yOffset = -1; yOffset <= 1; yOffset++) {
                for(let xOffset = -1; xOffset <= 1; xOffset++) {
                    const y = yIndex + yOffset;
                    const x = xIndex + xOffset;
                    if((x >= 0 && x <= max)&&(y >= 0 && y <= max)) {
                        newMatrix[y][x] = brushColour;
                    }
                }
            }
        }
        else if (brushSize === "large") {
            for(let yOffset = -2; yOffset <= 2; yOffset++) {
                for(let xOffset = -2; xOffset <= 2; xOffset++) {
                    const y = yIndex + yOffset;
                    const x = xIndex + xOffset;
                    if((x >= 0 && x <= max)&&(y >= 0 && y <= max)) {
                        newMatrix[y][x] = brushColour;
                    }
                }
            }
        }

        setDrawingMatrix(newMatrix);
    }

    useEffect(() => {
        setCurColour(colour);
    }, [colour]);

    return(
        <div className="w-auto aspect-square gap-1" style={{backgroundColor:curColour}}
        onMouseOver={paintable?brushStroke:null} onMouseDown={paintable?paint:null}></div>
    );
}