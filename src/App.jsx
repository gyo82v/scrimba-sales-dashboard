import {useState, useEffect} from "react"
import supabase from "./supabase-client.js"

import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import Form from "./components/Form"


function App() {
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    const fetchMetrics = async () => {
      try{
        const {error, data} = await supabase.from('sales_deals').select(`name, value.sum()`)
        if(error) throw error
        setMetrics(data)
      }catch(err){
        console.error("Error GET fecthMetrics", err)
      }
    }

    fetchMetrics()

    const channel = supabase.channel("deal-changes").on("postgres_changes", {
      event : '*',
      schema : "public",
      table : "sales_deals"
    }, 
    payload => {fetchMetrics()}
  ).subscribe()

  return () => {supabase.removeChannel(channel)}
  }, [])


  return (
    <div className="bg-indigo-50 flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex flex-col items-center w-full flex-1 p-4">
        <Dashboard metrics={metrics} />
        <Form metrics={metrics} />
      </main>
    </div>
  )
}

export default App
