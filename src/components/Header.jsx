export default function Header(){
    const header = `bg-gradient-to-br from-indigo-700 to-indigo-600 text-indigo-100 
                    p-5 shadow-lg shadow-indigo-700/30 flex items-center justify-center 
                    text-2xl font-bold w-full`
    return(
        <header className={header}>
            <h1>Sales Dashboard</h1>
        </header>
    )
}