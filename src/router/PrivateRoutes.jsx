import { Navigate, Route, Routes } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { InventoryPage } from "../pages/InventoryPage"
import { RequestsPage } from "../pages/RequestsPage"
import { TicketsPage } from "../pages/TicketsPage"
import { SingleRequestsPage } from "../pages/SingleRequestPage"
import { SingleTicketPage } from "../pages/SingleTicketPage"

export const PrivateRoutes = () => {
  return (
    <div className="flex">
      <Sidebar />
      <section className="px-12 py-12">
        <Routes>
          <Route path="/" element={ <InventoryPage /> } />
          <Route path="/requests" element={ <RequestsPage /> } />
          <Route path="/request/:id" element={ <SingleRequestsPage /> } />
          <Route path="/tickets" element={ <TicketsPage /> } />
          <Route path="/ticket/:id" element={ <SingleTicketPage /> } />
          <Route path="/*" element={ <Navigate to="/" /> } />
        </Routes>
      </section>
    </div>
  )
}
