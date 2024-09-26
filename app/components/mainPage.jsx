import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TopBar from "./topBar";
import { useDrawingContext } from "../context/DrawingContext";
import { Flip, ToastContainer } from "react-toastify"
import Canvas from "./canvas";
import SideBar from "./sideBar";


export default function MainPage() {

    const {modal, drawingMatrix} = useDrawingContext();

    const [curCanvas, setCurCanvas] = useState([]);

    const updateCanvas = () => {
        if(drawingMatrix) {
            setCurCanvas(<Canvas gridSize={drawingMatrix.length}/>)
        }
    }


    useEffect(() => {
        updateCanvas();
    }, [drawingMatrix]);

    return(
        <div id="mainContainer" className="w-screen h-screen flex flex-col justify-center items-center
        overflow-hidden">
            <TopBar/>
            <div className="flex flex-grow h-full w-full flex-row relative justify-end">
                <SideBar/>
                <div className=" sm:w-3/4 w-full h-full flex flex-row items-center justify-center bg-zinc-900">
                    {curCanvas}
                </div>
            </div>
            <ToastContainer className="text-center"position="bottom-center" hideProgressBar={true} 
            theme="dark" autoClose={2000} transition={Flip}/>
            {modal}
        </div> 
    );
}