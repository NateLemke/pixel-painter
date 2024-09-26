import React, { useEffect, useState } from "react";

export default function TableEntry({title, id, matrix, setSelected}) {


    const handleClick = () => {
        setSelected({
            title:title,
            id:id,
            matrix:matrix
        });
    }

    return(
        <tr className={`hover:bg-zinc-900 cursor-pointer odd:bg-zinc-500 even:bg-zinc-400`} 
        onClick={handleClick}>
            <h3 className="pl-1">{title}</h3>
        </tr>
    );
}