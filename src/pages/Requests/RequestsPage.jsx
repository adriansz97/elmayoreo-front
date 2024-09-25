import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllRequest } from "../../api";
import { Button, Header, Table } from "../../components"
import { ModalSimulateRequest } from "./ModalSimulateRequest";

const headers = [
  "id:",
  "Numero de productos:",
  "Status",
  "Acciones:",
];

const keys = [
  "order_id",
  "items_qty",
  "status",
  "actions",
];

const Actions = ({ order_id }) => {
  return (
    <NavLink className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-300 hover:bg-gray-200 rounded-lg" to={`/request/${order_id}`} state={{hola: "hola"}}>
      Ver
    </NavLink>
  )
}

export const RequestsPage = () => {

  const [requests, setRequests] = useState([]);
  const [showModalSimulateRequest, setShowModalSimulateRequest] = useState(false);

  useEffect(() => {
    getAllRequest()
    .then(resp=>{
      console.log(resp);
      const parsedRequest = resp.map(item=> ({ 
        order_id: item?.order_id, 
        items_qty: item?.items?.length,
        status: item?.status,
        actions: <Actions order_id={item?.order_id} />,
      }));
      setRequests(parsedRequest);
    })
    .catch(console.log);
  }, []);

  return (
    <>
      <ModalSimulateRequest
        show={showModalSimulateRequest}
        onHide={()=>setShowModalSimulateRequest(false)}
        Actions={Actions}
        setRequests={setRequests}
      />

      <div className="max-w-screen-xl mx-auto px-4">

        {/* Header */}
        <div className="items-start justify-between sm:flex">
          <Header>Solicitudes</Header>
          <Button 
            label="Simular solicitud"
            onClick={()=>setShowModalSimulateRequest(true)}
            className="mt-3 w-full sm:w-auto sm:mt-0"
          />
        </div>

        {/* Tabla */}
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <Table headers={headers} keys={keys} items={requests} />
        </div>

      </div>
      
    </>
  )
}
