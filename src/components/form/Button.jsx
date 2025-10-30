export default function Button({width, children}){
    const style = `px-4 py-2 font-bold bg-gradient-to-br from-indigo-700 to-violet-600 rounded-lg 
                   shadow-lg shadow-indigo-700/30 text-violet-100
                   hover:scale-105 active:scale-95 hover:shadow-xl hover:from-violet-600 hover:to-indigo-700
                   transition-transform transition-colors transition-shadow duration-300 ease-in-out
                   ${width || "w-full"}`
    return(
        <button type="submit" className={style}>{children}</button>
    )
}