import React, {useState, useEffect} from "react";
import Pixel from "./pixel";

export default function Preview({gridSize,selectedMatrix}) {

    const [pixels, setPixels] = useState([]);


    useEffect(() => {
        setPixels([]);
        if(selectedMatrix) {
            let newPixels = [];
            for(let y = 0; y < selectedMatrix.length; y++) {
                for(let x = 0; x < selectedMatrix[0].length; x++) {
                    newPixels.push(<Pixel colour={selectedMatrix[y][x]} xIndex={x} yIndex={y}
                    max={gridSize-1} paintable={false}/>);
                }
            }

            setPixels(newPixels);
        }
    }, [selectedMatrix]);

    return(
        <div className="bg-zinc-600 aspect-square h-full grid gap-px overflow-hidden" 
                style={{gridTemplateColumns:`repeat(${gridSize},1fr)`}}>
            {pixels}
        </div>
    );
}