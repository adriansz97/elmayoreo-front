import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getOutlays, getReport } from "../../api";
import { Button, Header, Input, Select, Table } from "../../components";
import { fDateDDMMYYYY, formatDate } from "../../helpers/dates";
import { enqueueSnackbar } from "notistack";

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

const headers2 = [
  "id",
  "product_id",
  "qty",
  "amount",
  "entry_date",
];

const keys2 = [
  "id",
  "product_id",
  "qty",
  "amount",
  "entry_date",
];

const Actions = ({ order_id }) => {
  return (
    <NavLink className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-300 hover:bg-gray-200 rounded-lg" to={`/request/${order_id}`}>
      Ver
    </NavLink>
  )
}

export const ReportsPage = () => {

  const startDateLS = localStorage.getItem("startDate");
  const endDateLS = localStorage.getItem("endDate");

  const [selectValue, setSelectValue] = useState("ingresos");
  const [tableShowed, setTableShowed] = useState("ingresos");
  const [startDate, setStartDate] = useState(startDateLS || formatDate(new Date()));
  const [endDate, setEndDate] = useState(endDateLS ||formatDate(new Date()));
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (startDateLS && endDateLS) {
      getIngresos();
    } 
    if (startDateLS) {
      localStorage.setItem("start", startDate);
    } 
    if (endDateLS) {
      localStorage.setItem("end", endDate);
    } 
  }, []);

  const getIngresos = async() => {
    try {
      const resp = await getReport(startDate, endDate);
      setTableShowed("ingresos");
      const parsedResults = resp.map(item=> ({ 
        payment_id: item?.payment_id, 
        order_id: item?.order_id, 
        delivery_date: fDateDDMMYYYY(item?.delivery_date) === "01-01-2000" ? "Fecha no asignada" : fDateDDMMYYYY(item?.delivery_date),
        total_amount: item?.total_amount,
        actions: <Actions order_id={item?.order_id} />,
      }));
      // todo: Poner el precio total
      // let price 
      setResults(parsedResults);
    } catch (error) {
      enqueueSnackbar({ variant: "warning", message: "No hay resultados" });
    }
  }

  const getEgresos = async() => {
    try {
      const resp = await getOutlays(startDate, endDate);
      setTableShowed("egresos");
      const parsedResults = resp.map(item=> ({ 
        id: item?.id, 
        product_id: item?.product_id, 
        qty: item?.qty,
        amount: item?.amount,
        entry_date: item?.entry_date,
      }));
      setResults(parsedResults);
    } catch (error) {
      
    }
  }

  const handleChangeDate = (value, startend) => {
    if (startend === "start") {
      localStorage.setItem("startDate", value);
      setStartDate(value);
    } else if (startend === "end") {
      localStorage.setItem("endDate", value);
      setEndDate(value);
    }
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4">

        {/* Header */}
        <div className="items-center justify-between sm:flex">
          <div>
            <Header>Reportes</Header>

            <div className="flex mt-5">
              <Input type="date" label="Fecha inicio" value={startDate} onChange={(e)=>handleChangeDate(e.target.value, "start")} />
              <Input type="date" label="Fecha final" value={endDate} onChange={(e)=>handleChangeDate(e.target.value, "end")} className="ms-4" />
              <Select className="ms-4 h-12" value={selectValue} onChange={(e)=>setSelectValue(e.target.value)}>
                <option value="ingresos">Ingresos</option>
                <option value="egresos">Egresos</option>
              </Select>
            </div>
          </div>

          <Button 
            label="Buscar entre fechas"
            onClick={selectValue === "ingresos" ? getIngresos : getEgresos}
            className="mt-3 w-full sm:w-auto sm:mt-0"
          />
        </div>

        {/* Tabla */}
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          {
            tableShowed === "ingresos"
            ? <Table headers={headers} keys={keys} items={results} />
            : <Table headers={headers2} keys={keys2} items={results} />
          }
        </div>

      </div>
      
    </>
  )
}
