import { useEffect, useState } from "react";
import { acceptRequest, createPayment, getAllRequest, getProductById, getRequestCheck, getRequestInfo } from "../api";
import { Table } from "../components/Table"
import { NavLink, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const headers = [
  "Nombre:",
  "Cantidad:",
];

const keys = [
  "name",
  "qty",
]

export const SingleRequestsPage = () => {

  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [isAviable, setIsAviable] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    getRequestInfo(id)
    .then(resp => {
      setTotalAmount(resp?.total_amount);
      setItems(resp?.items);
      setStatus(resp?.status);
    })
    .catch(console.log);
  }, [id]);
  
  const handleVerifyOrder = async() => {
    try {
      await getRequestCheck(id);
      enqueueSnackbar({ variant: "success", message: "Hay suficiente inventario" });
      setIsAviable(true);
    } catch (error) {
      console.log(error); 
    }
  }

  const handleAcceptOrder = async() => {
    try {
      await acceptRequest(id);
      enqueueSnackbar({ variant: "success", message: "Orden aceptada" });
      setStatus('accepted');
    } catch (error) {
      console.log(error); 
    }
  }

  const handleSimulatePayment = async() => {
    try {
      await createPayment(id, totalAmount);
      setStatus('paid');
    } catch (error) {
      
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4">

      {/* Header */}
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg me-10">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Solicitud { id }
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          {
            !isAviable && status === "pending" &&
            <button
              onClick={handleVerifyOrder}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Verificar orden
            </button>
          }
          {
            isAviable && status === "pending" &&
            <button
              onClick={handleAcceptOrder}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-green-600 rounded-lg hover:bg-green-500 active:bg-green-700 md:text-sm"
            >
              Apartar en inventario
            </button>
          }
        </div>
      </div>


      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto mb-4">
        <Table headers={headers} keys={keys} items={items} />
      </div>

      {
        status === 'accepted' && 
        <div>
          <button
            onClick={handleSimulatePayment}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-green-600 rounded-lg hover:bg-green-500 active:bg-green-700 md:text-sm w-full"
          >
            Simular Pago
          </button>
        </div>
      }

    </div>
  )
}
