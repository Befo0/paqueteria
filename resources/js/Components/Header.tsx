import {ReactNode } from "react";

export default function Header({children}: {children: ReactNode}){
    return(
        <h2 className="text-xl font-semibold loading-tight text-gray-800">
            {children}
        </h2>
    )
}