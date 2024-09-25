import { useEffect, useState } from "react";
import { getProducts } from "../../api";
import { Button, Header, Table } from "../../components";
import { ModalBuy } from "./ModalBuy";
import { ModalAddProduct } from "./ModalAddProduct";

const headers = [
  "id:",
  "Nombre:",
  "Stock:",
  "Precio unitario:",
  "Precio +100:",
  "Precio sugerido:",
  "Acciones",
];

const keys = [
  "id",
  "name",
  "qty",
  "unit_price",
  "wholesale_price",
  "retail_price",
  "actions"
]

const Actions = ({ product, setShowModalBuy, setSelectedPrductToBuy }) => {

  const handleStartToBuy = () => {
    setShowModalBuy(true);
    setSelectedPrductToBuy(product);
  }

  return (
    <>
      <button className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-300 hover:bg-gray-200 rounded-lg" onClick={handleStartToBuy}>
        Ingresar
      </button>
    </>
  )
}

export const InventoryPage = () => {

  const [products, setProducts] = useState([]);
  const [selectedPrductToBuy, setSelectedPrductToBuy] = useState(null);
  const [showModalBuy, setShowModalBuy] = useState(false);
  const [showModalAddProduct, setShowModalAddProduct] = useState(false);

  useEffect(() => {
    getProducts()
    .then(resp=>{
      setProducts(resp?.map(product=>({ 
        ...product, 
        actions: 
          <Actions 
            product={product}
            setShowModalBuy={setShowModalBuy}
            setSelectedPrductToBuy={setSelectedPrductToBuy} 
          />
      })))
    })
    .catch(console.log);
  }, []);

  return (
    <>
      <ModalBuy
        show={showModalBuy}
        onHide={()=>setShowModalBuy(false)}
        setProducts={setProducts}
        selectedPrductToBuy={selectedPrductToBuy}
      />
      <ModalAddProduct
        show={showModalAddProduct}
        onHide={()=>setShowModalAddProduct(false)}
        setProducts={setProducts}
        setShowModalBuy={setShowModalBuy}
        setSelectedPrductToBuy={setSelectedPrductToBuy}
      />

      <div className="max-w-screen-xl mx-auto px-4">

        {/* Header */}
        <div className="items-start justify-between sm:flex">
          <Header>Inventario</Header>
          <Button 
            label="Agregar producto" 
            onClick={()=>setShowModalAddProduct(true)}
            className="mt-3 w-full sm:w-auto sm:mt-0"
          />
        </div>

        {/* Tabla */}
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <Table headers={headers} keys={keys} items={products} />
        </div>

      </div>
    </>
  )
}
