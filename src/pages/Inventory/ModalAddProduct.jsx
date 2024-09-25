import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { addNewProduct } from "../../api";
import { Input, Modal } from "../../components";

export const ModalAddProduct = ({ show, onHide, setProducts, setShowModalBuy, setSelectedPrductToBuy }) => {
  
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