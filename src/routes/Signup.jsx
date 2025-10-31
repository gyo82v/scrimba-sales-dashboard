import {Link, useNavigate} from "react-router-dom"
import {useActionState} from "react"
import { useAuth } from "../context/AuthContext"
import Form from "../components/form/index.jsx"

export default function Signup(){
    const {signUpNewUser} = useAuth()
    const navigate = useNavigate()
    const [error, submitAction, isPending] = useActionState(async (_prev, formData) => {
        const email = formData.get("email")
        const password = formData.get("password")
        const name = formData.get("name")
        const account_type = formData.get("account_type")

        const {success, data, error} = await signUpNewUser(email, password, name, account_type)
        if(error) return new Error(error)
        if(success && data?.session){
            navigate("/dashboard")
            return null
        }
        return null
    }, null)

    return(
        <section className="w-full md:w-7/12 lg:w-5/12 xl:w-4/12 text-indigo-700 shadow-lg 
                            p-4 rounded-lg md:p-6 lg:px-10 mt-14">
            <h2 className="text-xl font-bold mt-6">Sign up today!</h2>
            <Form submitAction={submitAction}>
                <Form.Input name="name" error={error} isPending={isPending} label="name"/>
                <Form.Input type="email" name="email" error={error} isPending={isPending} label="email" />
                <Form.Input type="password" name="password" error={error} isPending={isPending} label="password"/>
                <Form.RadioEl />
                <Form.Button>{isPending ? "Signing up..." : "Sign up"}</Form.Button>
            </Form>   
            <p className="text-center">
                Already have an account?
                <Link to="/signin" className="text-violet-600 font-bold ml-1">Sign in</Link>
            </p>
        </section>
    )
}