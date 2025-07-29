"use client"

import { createContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

const DarkModeProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(()=>{
        const preference = localStorage.getItem("theme");
        const preferDarkMode = preference === "dark";

        setIsDarkMode(preferDarkMode)

        if(preferDarkMode){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
    },[])


    const toggleDarkMode = () =>{
        setIsDarkMode((prev) =>{
            const newValue = !prev
            localStorage.setItem("theme", newValue ? "dark" : "light")
            document.documentElement.classList.toggle("dark", newValue);
            return newValue
        })
    }

      if (isDarkMode === null) {
        return null;
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );

}

export default DarkModeProvider;