import { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { createRequest, getProducts } from '../../api';
import {  Button, Input, Modal, Select } from "../../components"

export const ModalSimulateRequest = ({ show, onHide, setRequests, Actions }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [qty, setQty] = useState(1);

  // Cargar los productos desde el backend al montar el componente
  useEffect(() => {
    getProducts()
    .then(setProducts)
    .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  // Función para agregar productos al carrito
  const addToCart = () => {
    if (!selectedProduct || qty <= 0) {
      enqueueSnackbar({ variant: "warning", message: "Selecciona un producto válido y una cantidad mayor a 0." });
      return;
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.product_id === selectedProduct);
    if (existingProduct) {
      // Si ya está, solo actualiza la cantidad
      setCart(
        cart.map((item) =>
          item.product_id === selectedProduct ? { ...item, qty: item.qty + qty } : item
        )
      );
    } else {
      // Si no está, agrégalo al carrito
      setCart([...cart, { product_id: selectedProduct, qty }]);
    }
    setQty(1); // Reinicia la cantidad después de agregar al carrito
  };

  // Función para enviar el carrito como una solicitud
  const handleSubmit = async () => {
    if (cart.length === 0) {
      enqueueSnackbar({ variant: "warning", message: "El carrito está vacío." });
      return;
    }
    try {
      const resp = await createRequest(cart);
      enqueueSnackbar({ variant: "success", message: "Solicitud creada" });
      setRequests(pvRequests=>[...pvRequests, { ...resp, items_qty: cart.length, actions: <Actions order_id={resp.order_id} /> }])
      onHide();
    } catch (error) {
      enqueueSnackbar({ variant: "success", message: error.message });
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>

      <div>
        <h4 className="font-bold text-xl mb-3">Crear Solicitud</h4>

        {/* Selección de productos */}
        <div>
          <label>Producto: </label>
          <Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(parseInt(e.target.value))}
            className="mt-2 mb-4"
          >
            <option value="">Seleccione un producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>

          {/* <label htmlFor="qty">Cantidad: </label> */}
          <Input 
            type="number"
            id="qty"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
            min="1"
            label="Cantidad"
          />

          <Button
            label='Agregar al Carrito'
            onClick={addToCart}
            className='w-full'
          />

        </div>

        {/* Mostrar el carrito */}
        <div className='bg-gray-200 my-4 p-4 rounded-lg'>
          <h3 className='font-bold'>Carrito</h3>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ul>
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.product_id);
                return (
                  <li key={item.product_id}>
                    {product?.name || 'Producto desconocido'} ({item.qty})
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Botón para enviar la solicitud */}
        <Button onClick={handleSubmit} label='Enviar Solicitud' variant='success' className='w-full' />
      </div>
    </Modal>
  );
}
