import {Link, useNavigate} from "react-router-dom"
import {useActionState} from "react"
import { useAuth } from "../context/AuthContext"
import Form from "../components/form/index.jsx"

export default function Signup(){
    const {SignUpNewUser} = useAuth()
    const navigate = useNavigate()
    const [error, submitAction, isPending] = useActionState(async (_prev, formData) => {}, null)
    //tailwind
    const container = ``
    const h2 = ``
    const p = ``
    const link = ``
    //

    return(
        <section className={container}>
            <h2 className={h2}>Sign up today!</h2>
            <Form submitAction={submitAction}>
                <Form.Input name="name" error={error} isPending={isPending} label="name"/>
                <Form.Input type="email" name="email" error={error} isPending={isPending} label="email" />
                <Form.Input type="password" name="password" error={error} isPending={isPending} label="password"/>
                <Form.RadioEl />
                <Form.Button>{isPending ? "Signing up..." : "Sign up"}</Form.Button>
            </Form>   
            <p className={p}>Already have an account?<Link to="signin" className={link}>Sign in</Link></p>
        </section>
    )
}