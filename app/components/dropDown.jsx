import React from "react";
import ModalNew from "./modalNew";
import { useDrawingContext } from "../context/DrawingContext";
import ModalOpen from "./modalOpen";
import { db } from "@/firebase";
import { addDoc, setDoc, collection, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function DropDown({menuShowing, closeMenu}) {
    const {setModal, setDrawingID, drawingID, setDrawingTitle, setDrawingMatrix,
        drawingTitle, drawingMatrix} = useDrawingContext();
    const {currentUser} = useAuth()

    const openNewModal = () => {
        setModal(<ModalNew/>)
        closeMenu()
    }

    const openOpenModal = () => {
        setModal(<ModalOpen/>)
        closeMenu()
    }


    const saveDrawing = async () => {
        closeMenu()
        const drawingsRef = collection(db, "users", currentUser.uid, "drawings");
        try {
            if(!drawingID) {
                const drawDoc = await addDoc(drawingsRef, {title:drawingTitle, matrix:JSON.stringify(drawingMatrix)});
                setDrawingID(drawDoc.id);
            } else {
                await setDoc(doc(drawingsRef, drawingID), {title:drawingTitle, matrix:JSON.stringify(drawingMatrix)});
            }
            toast("Saved Successfully");
            
        } catch (error) {
            toast("Failed to save drawing");
            console.error(error);
            
        }
        
    }

    return(
        <div id="dropDownMenu" className={`w-24 bg-zinc-700 z-20 duration-300 top-0 left-0 
        absolute ${menuShowing ? "":"-translate-y-full"}`} onMouseLeave={closeMenu}>
            <div id="menuOptions" className="w-full mt-7 border-t border-zinc-900">
                <ul className="flex flex-col justify-center items-center p-1 text-sm">
                    <li className="w-11/12 border-b border-zinc-900 hover:bg-zinc-800 pl-1
                    cursor-pointer" onClick={openNewModal}>New</li>
                    <li className="w-11/12 border-b border-zinc-900 hover:bg-zinc-800 pl-1
                    cursor-pointer" onClick={openOpenModal}>Open</li>
                    <li className="w-11/12 hover:bg-zinc-800 pl-1
                    cursor-pointer" onClick={saveDrawing}>Save</li>
                </ul>
            </div>
        </div>
    );
}