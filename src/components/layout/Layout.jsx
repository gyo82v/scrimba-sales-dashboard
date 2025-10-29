import {Outlet} from "react-router-dom"
import Header from "./Header"

export default function Layout(){
    return(
        <>
          <Header />
          <main className="flex flex-col items-center w-full flex-1 p-4">
            <Outlet />
          </main>
        </>
    )
}