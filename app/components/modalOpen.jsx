import React, { useEffect, useState } from "react";
import { useDrawingContext } from "../context/DrawingContext";
import ModalHeader from "./modalHeader";
import { db } from "@/firebase";

import { getDocs, deleteDoc, collection, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import TableEntry from "./tableEntry";
import ModalDelete from "./modalDelete";
import Canvas from "./canvas";
import Preview from "./preview";


export default function ModalOpen() {
    const minTable = 8;

    const [isLoading, setIsLoading] = useState(true);
    const [tableContents, setTableContents] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedID, setSelectedID] = useState(null);
    const [selectedMatrix, setSelectedMatrix] = useState(null);


    const {setModal, setDrawingID, setDrawingTitle, setDrawingMatrix} = useDrawingContext();
    const {currentUser} = useAuth()

    const setSelectedDrawing = (drawing) => {
        setSelectedTitle(drawing.title);
        setSelectedID(drawing.id);
        setSelectedMatrix(drawing.matrix);
    }

    const fetchDrawings = async() => {
        let rows = [];
        let curKey = 0;
        
        const userRef = doc(db, "users", currentUser.uid);
        const querySnapshot = await getDocs(collection(userRef, "drawings"));

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            
            rows.push(<TableEntry title={data.title} id={id} matrix={JSON.parse(data.matrix)}
            key={curKey} setSelected = {setSelectedDrawing}/>);

            curKey++;
        });

        while(rows.length < 8) {
            rows.push(<tr className="odd:bg-zinc-500 even:bg-zinc-400"><br/></tr>);
        }

        setTableContents(rows);
        setIsLoading(false);
    }

    const openDrawing = () => {
        setDrawingTitle(selectedTitle);
        setDrawingID(selectedID);
        setDrawingMatrix(selectedMatrix);
        setModal([]);
    }

    useEffect(() => {
        fetchDrawings()
    }, [])


    return(
        <div className="absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center 
        items-center z-50 text-zinc-500">
            <div className="flex flex-1 flex-col justify-center items-center bg-zinc-800 
            sm:max-w-[25rem] max-w-[90%] rounded-lg">
                <ModalHeader title={"Open a Drawing"}/>
                <div className="w-full flex sm:flex-row flex-col-reverse justify-center items-center">
                    <div className="flex flex-col justify-center items-center sm:w-1/2 w-11/12 sm:mx-2">
                        <h3 className="translate-y-3 bg-zinc-800 px-1">Drawings</h3>
                        <div className="flex flex-cols w-full justify-center items-center p-2
                    border-zinc-500 border rounded-md">
                            <div className="flex flex-col items-center w-full overflow-scroll
                            sm:h-48 h-24 no-scrollbar mt-2">
                                {isLoading && <div className="w-10 h-10 mt-3 rounded-full 
                                animate-spin border-4 border-b-zinc-200 border-zinc-500"/>}
                                {!isLoading && <table className="w-full text-white">
                                    {tableContents}
                                </table>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center sm:w-1/2 w-11/12 sm:mx-2">
                        <h3 className="translate-y-3 bg-zinc-800 px-1">Preview</h3>
                        <div className="flex flex-cols w-full justify-center items-center px-2 py-3
                    border-zinc-500 border rounded-md">
                            <div className="flex flex-col justify-center items-center w-full sm:h-48 h-40">  
                                <Preview gridSize={selectedMatrix?selectedMatrix.length:0} 
                                selectedMatrix={selectedMatrix}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex flex-row items-end justify-end mt-2">
                    <div id="DeleteButton" className="p-2 mb-2 bg-zinc-600 hover:bg-zinc-700 cursor-pointer
                    rounded-md" onClick={() => setModal(<ModalDelete deletingID={selectedID}/>)}>
                        <h3 className="text-white">Delete</h3>
                    </div>
                    <div id="OpenButton" className="p-2 mb-2 bg-zinc-600 hover:bg-zinc-700 cursor-pointer
                    rounded-md mx-2" onClick={openDrawing}>
                        <h3 className="text-white">Open</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}