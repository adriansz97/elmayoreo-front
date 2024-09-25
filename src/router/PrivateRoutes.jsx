import { useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardPage, InventoryPage, PaymentsPage, RequestsPage, SinglePaymentPage, SingleRequestsPage } from "../pages";
import { Sidebar } from "../components";

export const PrivateRoutes = () => {

  const [activeSidebar, setActiveSidebar] = useState(false);

  return (
    <div className="h-screen">
      <div className="relative overflow-x-hidden h-full">

        <div className="text-end p-2 md:hidden">
          <button className="bg-emerald-500 border border-black h-8 w-8 cursor-pointer" onClick={()=>setActiveSidebar(true)}>=</button>
        </div>

        <div className="flex">
          <Sidebar
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
          />
          <div className="px-12 py-12 md:w-9/12 overflow-auto">
            <Routes>
              <Route path="/" element={ <DashboardPage /> } />
              <Route path="/inventory" element={ <InventoryPage /> } />
              <Route path="/requests" element={ <RequestsPage /> } />
              <Route path="/request/:id" element={ <SingleRequestsPage /> } />
              <Route path="/tickets" element={ <PaymentsPage /> } />
              <Route path="/ticket/:id" element={ <SinglePaymentPage /> } />
              <Route path="/*" element={ <Navigate to="/" /> } />
            </Routes>
          </div>
        </div>

      </div>
    </div>
  )
}
