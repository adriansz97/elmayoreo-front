import { useEffect, useState } from "react";
import { getAllRequest, getAllRequestByUser, getPayments } from "../api";
import { Table } from "../components/Table"
import { NavLink } from "react-router-dom";

const headers = [
  "id:",
  "# Orden",
  "Total",
  "Dia de entrega",
  "Acciones:",
];

const keys = [
  "payment_id",
  "order_id",
  "total_amount",
  "delivery_date",
  "actions",
];

const Actions = ({ payment_id }) => {
  return (
    <NavLink className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-300 hover:bg-gray-200 rounded-lg" to={`/ticket/${payment_id}`}>
      Ver
    </NavLink>
  )
}

export const TicketsPage = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getPayments()
    .then(resp=>{
      const parsedRequest = resp.map(item=> ({ 
        payment_id: item?.payment_id, 
        order_id: item?.order_id, 
        delivery_date: item?.delivery_date,
        total_amount: item?.total_amount,
        actions: <Actions payment_id={item?.payment_id} />,
      }));
      setRequests(parsedRequest);
    })
    .catch(console.log);
  }, []);


  return (
    <div className="max-w-screen-xl mx-auto px-4">

      {/* Header */}
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Pagos
          </h3>
        </div>
      </div>

      {/* Tabla */}
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <Table headers={headers} keys={keys} items={requests} />
      </div>

    </div>
  )
}
