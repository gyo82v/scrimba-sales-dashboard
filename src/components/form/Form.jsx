export default function Form({submitAction, width, margin, flex, children}){
    const container = `${width || "width-full"} ${margin || "my-6"} 
                       ${flex || "flex flex-col gap-5"}`
    return(
        <form action={submitAction} className={container}>
            {children}
        </form>
    )
}