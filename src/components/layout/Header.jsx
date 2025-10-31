import {NavLink, useNavigate} from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import {useState} from "react"

export default function Header(){
    const {users, session, signOut} = useAuth()
    const [error, seterror] = useState(null)
    const navigate = useNavigate()
    const currentUser = users.find(u => u.id === session?.user?.id)
    console.log("Current user: ", currentUser)

    //tailwind
    const header = `bg-gradient-to-br from-indigo-700 to-indigo-600 text-indigo-100 
                    p-5 shadow-lg shadow-indigo-700/30 
                    text-2xl font-bold w-full flex items-center justify-between 
                    md:text-3xl`
    const nav = `flex gap-3 md:gap-6 mr-2 md:mr-5`
    const link = `text-sm md:text-lg font-semibold 
                  transition-transform transition-colors duration-300 ease-in-out 
                  hover:scale-105 active:scale-95 hover:text-indigo-300`
    const section = `text-sm flex items-center font-medium gap-6`
    const span = `text-rose-300 font-bold ml-1`
    const btn = `transition-transform hover:scale-120 active:scale-95`
    //

    const handleLogOut = async () => {
        const {success, error} = await signOut()
        if(error) seterror(error.message)
        if(success) navigate("/signin")
    }

    return(
        <header className={header}>
            <h1>Sales Team</h1>
            {session ? 
             <section className={section}>
                <p>Logged in as: 
                    <span className={span}>{currentUser?.name},
                        <span className="text-indigo-200 ml-1 font-small">{currentUser?.account_type}</span>
                    </span>
                </p>
                <button className={btn} onClick={handleLogOut}><FaSignOutAlt className="h-5 w-5" /></button>
             </section> :
             <section className={section}>
                <p>Sign in to see the dashboard</p>
             </section>
            }
        </header>
    )
}