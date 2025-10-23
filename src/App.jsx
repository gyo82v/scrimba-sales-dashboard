import {useState, useEffect} from "react"
import supabase from "./supabase-client.js"

import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import Form from "./components/Form"


function App() {
  const [metrics, setMetrics] = useState([])
  const container = `bg-indigo-50 flex flex-col`

  useEffect(() => {
    const fetchMetrics = async () => {
      try{
        const {error, data} = await supabase.from('sales_deals').select(`name, value.sum()`)
        console.log("res: ", data)
        if(error) throw error
        setMetrics(data)
      }catch(err){
        console.error("Error GET fecthMetrics", err)
      }
    }

    fetchMetrics()
  }, [])




  return (
    <div className={container}>
      <Header />
      <Dashboard metrics={metrics} />
      <Form metrics={metrics} />
    </div>
  )
}

export default App
