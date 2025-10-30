import {useActionState} from "react"
import supabase from "../supabase-client.js"
import { useAuth } from "../context/AuthContext.jsx"


export default function Form({metrics}){
    const {session, users} = useAuth()
    const [error, submitAction, isPending] = useActionState(async (_prev, formData) => {
        const submittedName = formData.get("name")
        const user = users.find(u => u.name === submittedName)

        if(!user) return new Error("Invalid user")

        const newDeal = {user_id : user.id, value : formData.get("value")}
        const {error} = await supabase.from("sales_deals").insert(newDeal)
        if(error){
            console.error("Error updating the database", error.message)
            return new Error("failed to insert new deal")
        }
        return null
    },
    null
    )
    const currentUser = users.find(u => u.id === session?.user?.id)

    const generateOptions = () => {
    return users.filter(u => u.account_type === "rep").map(u => (
      <option key={u.name} value={u.name}>
        {u.name}
      </option>
     ));
    };

    const transition = `transition-transform transition-colors transition-shadow duration-300 ease-in-out`
    const container = `flex flex-col gap-3  p-4 bg-indigo-100 rounded-lg md:w-10/12 lg:w-8/12 xl:w-6/12
                       shadow-lg text-indigo-700 w-full mt-16 `
    const label = `flex gap-2 w-full items-center`
    const focus = `focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-violet-100 
                   focus:shadow-lg focus:shadow-indigo-300/50 focus:scale-105  hover:border-violet-400`
    const input = `flex-2 border-2 border-violet-300 rounded-lg px-4 py-2 font-semibold pointer-events-none focus:outline-none`
    const inputSelect = `flex-2 border-2 border-violet-300 rounded-lg px-4 py-2 font-semibold
                         bg-white text-gray-700 bg-no-repeat bg-right-3 bg-center`
    const btn = `px-4 py-2 font-bold bg-gradient-to-br from-indigo-700 to-violet-600 rounded-lg 
                 shadow-lg shadow-indigo-700/30 text-violet-100
                 hover:scale-105 active:scale-95 hover:shadow-xl hover:from-violet-600 hover:to-indigo-700`


    return(
        <form className={container} action={submitAction}>
            { currentUser?.account_type === "rep" ? (
               <label htmlFor="deal-name" className={label}>
                  <span className="flex-1">Name:</span>
                  <input 
                    id="deal-name"
                    type="text"
                    name="name"
                    readOnly
                    value={currentUser?.name || ""}
                    aria-label="Sales rapresentative name"
                    aria-readonly="true" 
                    className={input}
                  />
              </label>
            ) : (
              <label htmlFor="deal-name" className={label}>
                <span className="flex-1">Name:</span>
                <select 
                  id="deal-name"
                  name="name"
                  aria-required="true"
                  required
                  disabled={isPending}
                  defaultValue={metrics?.[0]?.name || ""}
                  className={`${inputSelect} ${focus} ${transition}`}  
                >
                  {generateOptions()}
                </select>
              </label>
            )
            }
            <label htmlFor="deal-amount" className={label}>
                <span className="flex-1">Amount £</span>
                <input
                 id = "deal-amount"
                 type="number"
                 name="value"
                 defaultValue={0}
                 min={0}
                 step={10}
                 disabled={isPending}
                 aria-label="deal amount in pounds"
                 aria-required="true"
                 required
                 className={`${input} ${transition} ${focus}`}
                />

            </label>
            <button type="submit" disabled={isPending} aria-busy={isPending} className={`${btn} ${transition}`}>
                {isPending ? "Adding deal..." : "Add deal"}
            </button>
        </form>
    )
}

