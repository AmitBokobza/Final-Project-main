import { createContext, FunctionComponent, ReactNode, useEffect, useState } from "react";
import { ThemeContextType, ThemeMode } from "../../services/types";


export const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => {}
})


interface ThemeProviderProps {
    children:ReactNode;
}
 
const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({children}) => {
    
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem("theme") as ThemeMode;
        return ((savedTheme === "light" || savedTheme === "dark") ? savedTheme : "dark")
    });


    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.classList.remove(`bg-light`, `bg-dark`); 
        document.body.classList.add(`bg-${theme}`);
    },[theme])

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
      
        
    };


    return ( 
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
     );
}
 
export default ThemeProvider;