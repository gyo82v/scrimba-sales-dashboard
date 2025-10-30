import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
import {useState, useEffect} from "react"
import { AuthContextProvider } from "./context/AuthContext.jsx"
import supabase from "./supabase-client.js"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

import Home from "./routes/Home.jsx"
import Signin from "./routes/Signin.jsx"
import Signup from "./routes/Signup.jsx"
import RootRedirect from "./routes/RootRedirect.jsx"
import Layout from "./components/layout/Layout.jsx"

function App() {
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    const fetchMetrics = async () => {
      try{
        const {error, data} = await supabase.from('sales_deals')
        .select(`value.sum(), ...user_profiles!inner(name)`)
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
      <Route path="/" element={<RootRedirect />} />
      <Route path="dashboard" element={<ProtectedRoute><Home metrics={metrics}/></ProtectedRoute>} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  ))


  return (
    <div className="bg-indigo-50 flex flex-col min-h-screen w-full">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  )
}

export default App
