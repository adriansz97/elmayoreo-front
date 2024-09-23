import { useEffect, useState } from "react";
import { getPaymentById, updateDeliveyDate  } from "../api";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Input } from "../components/Input";

const defaultDay = "2000-01-01"

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const SingleTicketPage = () => {

  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(formatDate(new Date()));

  useEffect(() => {
    getPaymentById(Number(id))
    .then(resp => {
      console.log(resp);
      setPayment(resp);
      let currentDeliveryDate = new Date(resp.delivery_date);
      currentDeliveryDate = formatDate(currentDeliveryDate)
      if (currentDeliveryDate !== defaultDay) {
        setDeliveryDate(currentDeliveryDate);
      }
    })
    .catch(console.log);
  }, [id]);

  const handleUpdateDate = async() => {
    try {
      const resp = await updateDeliveyDate(id, deliveryDate);
      enqueueSnackbar({ variant: "success", message: "Fecha actualizada" });
      setPayment({ delivery_date: deliveryDate, ...payment })
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="max-w-screen-xl mx-auto px-4">

      {/* Header */}
      <div className="items-start justify-between md:flex mb-4">
        <div className="max-w-lg me-10">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Pago #{ id }
          </h3>
        </div>
      </div>

      <div className="mb-4">
        <h4>Total de la compra: ${payment?.total_amount}</h4>
      </div>

      <div className="flex flex-col">
        <Input 
          type="date" value={deliveryDate} onChange={(e)=>setDeliveryDate(e.target.value)}
        />
        {
          formatDate(new Date(payment?.delivery_date)) === defaultDay &&
          <small className="text-red-700 mb-4">El dia de entrega aún no se a confirmado</small>
        }
        {
          formatDate(new Date(payment?.delivery_date)) === defaultDay 
          ? <button
              onClick={handleUpdateDate}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-green-600 rounded-lg hover:bg-green-500 active:bg-green-700 md:text-sm"
            >
              Confirmar fecha de entrega
            </button>
          : <button
              onClick={handleUpdateDate}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Actualizar fecha de entrega
            </button> 
        }
      </div>

    </div>
  )
}
