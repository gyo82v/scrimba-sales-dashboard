import {NavLink} from "react-router-dom"

export default function Header(){
    const header = `bg-gradient-to-br from-indigo-700 to-indigo-600 text-indigo-100 
                    p-5 shadow-lg shadow-indigo-700/30 
                    text-2xl font-bold w-full flex items-center justify-between 
                    md:text-3xl`
    const nav = `flex gap-3 md:gap-6 mr-2 md:mr-5`
    const link = `text-sm md:text-lg font-semibold 
                  transition-transform transition-colors duration-300 ease-in-out 
                  hover:scale-105 active:scale-95 hover:text-indigo-300`
    return(
        <header className={header}>
            <h1>Sales Team</h1>
            <nav className={nav}>
                <NavLink 
                  to="dashboard" 
                  className={({isActive}) => isActive ? `${link} underline` : link}
                >
                    Dashboard
                </NavLink>
                <NavLink 
                  to="signin" 
                  className={({isActive}) => isActive ? `${link} underline` : link}
                >
                    Sign in
                </NavLink>
            </nav>
        </header>
    )
}