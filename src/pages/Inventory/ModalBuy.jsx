import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { addInventoryQty } from "../../api";
import { Input, Modal } from "../../components";

export const ModalBuy = ({ show, onHide, setProducts, selectedPrductToBuy }) => {

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