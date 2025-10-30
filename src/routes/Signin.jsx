import {useActionState} from "react"
import {useNavigate, Link} from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Form from "../components/form/index.jsx"

export default function Signin(){
    const {SignInUser} = useAuth()
    const navigate = useNavigate()
    const [error, submitAction, isPending] = useActionState(async (_prev, formData) => {
        const email = formData.get("email")
        const password = formData.get("password")
        const {success, data, error} = await SignInUser(email, password)
        if(error) return new Error(error)
        if(success && data?.session){
            navigate("/dashboard")
            return null
        }
        return null
    }, null)

    return(
        <section className="w-full md:w-7/12 lg:w-5/12 xl:w-4/12 text-indigo-700 shadow-lg 
                            p-4 rounded-lg md:p-6 lg:px-10 mt-6">
            <h2 className="text-xl font-bold mt-6">Sign in</h2>
            <Form submitAction={submitAction}>
                <Form.Input type="email" name="email" error={error} isPending={isPending} label="email" />
                <Form.Input type="password" name="password" error={error} isPending={isPending} label="password"/>
                <Form.Button>{isPending ? "Signing in..." : "Sign in"}</Form.Button>
            </Form>
            <p className="text-center">
                Dont't have an account yet? 
                <Link to="/signup" className="text-violet-600 font-bold ml-1">Sign up</Link>
            </p>
        </section>
    )
}