import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase-client"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getInitialSession(){
            try {
                const {data, error} = await supabase.auth.getSession()
                if(error) throw error
                console.log("initial session:", data)
                setSession(data.session)
            }catch(err){
                console.error("Error getting initial session:", err.message)
            }
        }
        getInitialSession()

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log("Session changed: ", session)
        })
    }, [])

    useEffect(() => {
        if(!session) return

        async function fetchUsers() {
            try {
                const {data, error} = await supabase.from('user_profiles').select('id, name, account_type')
                if(error) throw error
                console.log("fetched users:", data)
                setUsers(data)
            }catch(err){
                console.error("Error fecthing users:", err.message)
            }
        }
        fetchUsers()
    }, [session])

    const signInUser = async (email, password) => {
        try {
            const { data, error} = supabase.auth.signInWithPassword({
                email : email.toLowerCase(),
                password
            })
            if(error){
                console.error("Supabase sign in error:", error.message)
                return {success : false, error : error.message}
            }
            console.log("Sign in with supabase successfull")
            return {success : true, data}  
        }catch(err){
            console.error("unexpected error during sign in", err.message)
            return {success : false, error : "An unexpected error occurred. Please try again."}   
        }
    }

    const signOut = async () => {
        try {
            const {error} = await supabase.auth.signOut()
            if(error){
                console.log("A supabase error occurred during sign out", error.message)
                return {success : false, error : error.message}
            }
            console.log("Sign out successfully")
            return {success : true}
        }catch(err){
            console.error("An unexpected error occurred during sign-out: ", err.message)
            return {success : false, error: "An unexpected error occurred during sign out."}
        }
    }

    const signUpNewUser = async (email, password, name, account_type) => {
        try {
            const {data, error} = await supabase.auth.signUp({
                email : email.toLowerCase(),
                password,
                options : {data : {name, account_type}}
            })
            if(error){
                console.error("Supabase sign up error:", error.message)
                return {success : false, error : error.message}
            }
            console.log("Sign in successfull", data)
            return({success : true, data})
        }catch(err){
            console.error("An unexpected error occurred during sign in:", err.message)
            return {success : false, error : "An unexpected error occurred. Please try again."}
        }
    }

    return(
        <AuthContext.Provider value={{session, users, signInUser, signOut, signUpNewUser}}>
           {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)