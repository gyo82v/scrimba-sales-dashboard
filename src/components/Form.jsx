import {useActionState} from "react"
import supabase from "../supabase-client.js"


export default function Form({metrics}){
    const [error, submitAction, isPending] = useActionState(async (prev, formData) => {
        const newDeal = {name : formData.get("name"), value : formData.get("value")}
        const {error} = await supabase.from("sales_deals").insert(newDeal)
        if(error){
            console.error("Error updating the database", error.message)
            return new Error("failed to insert new deal")
        }
        return null
    },
    null // initial state
    )
    //function to generate options for the select input
    const generateOptions = () => {
    return metrics.map((m) => (
      <option key={m.name} value={m.name}>
        {m.name}
      </option>
     ));
    };

    const transition = `transition-transform transition-colors transition-shadow duration-300 ease-in-out`
    const container = `flex flex-col gap-3  p-4 bg-indigo-100 rounded-lg md:w-10/12 lg:w-8/12 xl:w-6/12
                       shadow-lg text-indigo-700 w-full mt-16 `
    const label = `flex gap-2 w-full items-center`
    const input = `flex-2 
                   border-2 border-violet-300 rounded-lg px-4 py-2 font-semibold
                   focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-violet-100
                   focus:shadow-lg focus:shadow-indigo-300/50 focus:scale-105 hover:border-violet-400`
    const inputSelect = `flex-2 border-2 border-violet-300 rounded-lg px-4 py-2 font-semibold
                         bg-white text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-violet-100
                         focus:shadow-lg focus:shadow-indigo-300/50 focus:scale-105 hover:border-violet-400 
                         bg-no-repeat bg-right-3 bg-center`
    const btn = `px-4 py-2 font-bold bg-gradient-to-br from-indigo-700 to-violet-600 rounded-lg 
                 shadow-lg shadow-indigo-700/30 text-violet-100
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-violet-600 hover:to-indigo-700`


    return(
        <form className={container} action={submitAction}>
            <label htmlFor="deal-name" className={label}>
                <span className="flex-1">Name:</span>
                <select 
                  id="deal-name"
                  name="name"
                  aria-required="true"
                  required
                  disabled={isPending}
                  defaultValue={metrics?.[0]?.name || ""}
                  className={inputSelect}
                  
                >
                  {generateOptions()}
                </select>
            </label>
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
                 className={`${input} ${transition}`}
                />

            </label>
            <button type="submit" disabled={isPending} aria-busy={isPending} className={`${btn} ${transition}`}>
                {isPending ? "Adding deal..." : "Add deal"}
            </button>
        </form>
    )
}

