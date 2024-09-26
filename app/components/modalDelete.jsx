import React from "react";
import ModalHeader from "./modalHeader";
import { db } from "@/firebase";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import ModalOpen from "./modalOpen";
import { useDrawingContext } from "../context/DrawingContext";
import { toast } from "react-toastify";


export default function ModalDelete({deletingID}) {

    const {currentUser} = useAuth();
    const {setModal} = useDrawingContext()

    const deleteDrawing = async () => {
        const drawingsRef = collection(db, "users", currentUser.uid, "drawings");
        try{
            await deleteDoc(doc(drawingsRef, deletingID));
            toast("Successfully deleted Drawing");
            setModal([]);
        } catch (error) {
            toast("failed to delete drawing");
            console.error(error);
        }
    }

    return(
        <div className="absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center 
        items-center z-50 text-zinc-500">
            <div className="flex flex-1 flex-col justify-center items-center bg-zinc-800 
            sm:max-w-[25rem] max-w-[90%] rounded-lg">
                <ModalHeader title={"Delete Drawing"}/>
                <h1>Are you sure you want to delete this Drawing?</h1>
                <div className=" w-full flex flex-row items-end justify-end mt-2">
                    <div id="CancelButton" className="p-2 mb-2 bg-zinc-600 hover:bg-zinc-700 cursor-pointer
                    rounded-md" onClick={() => setModal(<ModalOpen/>)}>
                        <h3 className="text-white">No, Cancel</h3>
                    </div>
                    <div id="DeleteButton" className="p-2 mb-2 bg-red-700 hover:bg-red-800 
                    cursor-pointer rounded-md mx-2" onClick={deleteDrawing}>
                        <h3 className="text-white">Yes, Delete</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}