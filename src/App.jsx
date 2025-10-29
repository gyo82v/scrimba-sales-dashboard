import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
import {useState, useEffect} from "react"
import supabase from "./supabase-client.js"

import Home from "./routes/Home.jsx"
import Signin from "./routes/Signin.jsx"
import Signup from "./routes/Signup.jsx"
import Layout from "./components/layout/Layout.jsx"

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

  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="dashboard" element={<Home metrics={metrics} />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  ))


  return (
    <div className="bg-indigo-50 flex flex-col min-h-screen w-full">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
