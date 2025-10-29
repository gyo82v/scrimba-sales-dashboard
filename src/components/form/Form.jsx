export default function Form({submitAction, children}){
    const container = ``
    return(
        <form action={submitAction} className={container}>
            {children}
        </form>
    )
}