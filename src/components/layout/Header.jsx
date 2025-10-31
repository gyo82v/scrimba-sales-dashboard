import {useNavigate} from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Header(){
    const {users, session, signOut} = useAuth()
    const navigate = useNavigate()
    const currentUser = users.find(u => u.id === session?.user?.id)
    console.log("Current user: ", currentUser)

    //tailwind
    const header = `bg-gradient-to-br from-indigo-700 to-indigo-600 text-indigo-100 
                    p-5 shadow-lg shadow-indigo-700/30 md:text-3xl
                    text-2xl font-bold w-full flex items-center justify-between `
    //

    const handleLogOut = async () => {
        const {success} = await signOut()
        if(success) navigate("/signin")
    }

    return(
        <header className={header}>
            <h1>Sales Team</h1>
            {session ? 
             <section className="text-sm flex items-center font-medium gap-6">
                <p>Logged in as: 
                    <span className="text-rose-300 font-bold ml-1">{currentUser?.name},
                        <span className="text-indigo-200 ml-1 font-small">{currentUser?.account_type}</span>
                    </span>
                </p>
                <button className="transition-transform hover:scale-120 active:scale-95" onClick={handleLogOut}>
                    <FaSignOutAlt className="h-5 w-5" />
                    </button>
             </section> :
             <section className="text-sm flex items-center font-medium gap-6">
                <p>Sign in to see the dashboard</p>
             </section>
            }
        </header>
    )
}