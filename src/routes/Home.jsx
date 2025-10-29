import Dashboard from "../components/Dashboard"
import Form from "../components/Form"

export default function Home({metrics}){
    return(
        <>
            <Dashboard metrics={metrics} />
            <Form metrics={metrics} />
        </>
    )
}