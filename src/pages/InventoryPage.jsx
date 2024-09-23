import { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { addInventoryQty, addNewProduct, getProducts } from "../api";
import { Modal } from "../components/Modal";
import { enqueueSnackbar } from "notistack";
import { Input } from "../components/Input";

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

const ModalBuy = ({ show, onHide, setProducts, selectedPrductToBuy }) => {

  const [quantity, setQuantity] = useState("");

  const handleBuy = async(e) => {
    e.preventDefault();
    try {
      await addInventoryQty(selectedPrductToBuy.id, Number(quantity));
      enqueueSnackbar({ variant: "success", message: "Actualizado" });
      setProducts(pvProducts=>{
        const newProducts = pvProducts.map(prod => prod.id !== selectedPrductToBuy.id ? prod : { ...prod, qty: prod.qty + Number(quantity)} );
        return newProducts;
      });
      setQuantity("");
      onHide();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal show={show} onHide={()=>onHide(false)} >
      <form onSubmit={handleBuy}>
        <h4 className="font-bold text-xl mb-3">{selectedPrductToBuy?.name}</h4>
        <Input 
          id="quantity"
          type="number" 
          value={quantity} 
          onChange={(e)=>setQuantity(e.target.value)} 
          label="Cantidad"
        />
        <button
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm w-full"
          onClick={handleBuy}
        >
          Ingresar
        </button>
      </form>
    </Modal>
  )
}

const ModalAddProduct = ({ show, onHide, setProducts, setShowModalBuy, setSelectedPrductToBuy }) => {
  
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");

  const handleAddProduct = async(e) => {
    e.preventDefault();
    try {
      const resp = await addNewProduct(name, Number(qty), Number(unitPrice), Number(wholesalePrice), Number(retailPrice));
      enqueueSnackbar({ variant: "success", message: "Actualizado" });
      setProducts(pvProducts=>[...pvProducts, 
        {
          ...resp, 
          actions: 
            <Actions 
              product={resp}
              setShowModalBuy={setShowModalBuy}
              setSelectedPrductToBuy={setSelectedPrductToBuy} 
            /> 
        }
      ])
      setName("");
      setQty("");
      setUnitPrice("");
      setWholesalePrice("");
      setRetailPrice("");
      onHide();
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: "No se pudo crear el producto" });
      console.log(error);
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <form onSubmit={handleAddProduct}>
        <h4 className="font-bold text-xl mb-3 mt-3">Agregar producto</h4>
        <Input
          id={"name"} 
          value={name} 
          onChange={(e)=>setName(e.target.value)} 
          label="Nombre:"
        />
        <Input
          id={"qty"} 
          value={qty} 
          onChange={(e)=>setQty(e.target.value)} 
          label="Cantidad:"
        />
        <Input
          id={"unitPrice"} 
          value={unitPrice} 
          onChange={(e)=>setUnitPrice(e.target.value)} 
          label="Precio unitario:"
        />
        <Input
          id={"wholesalePrice"} 
          value={wholesalePrice} 
          onChange={(e)=>setWholesalePrice(e.target.value)} 
          label="Precio mayoreo:"
        />
        <Input
          id={"retailPrice"} 
          value={retailPrice} 
          onChange={(e)=>setRetailPrice(e.target.value)} 
          label="Precio sugerido:"
        />
        <button
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm w-full"
          type="submit"
        >
          Ingresar
        </button>
      </form>
    </Modal>
  )
}

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
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Inventario
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <button
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              onClick={()=>setShowModalAddProduct(true)}
            >
              Agregar producto
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <Table headers={headers} keys={keys} items={products} />
        </div>

      </div>
    </>
  )
}
