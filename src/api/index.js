import axios from "axios";

const host = "http://127.0.0.1:8080"
// const host = "https://fb3hgh7x-8080.usw3.devtunnels.ms/"

const apicall = axios.create({ 
  baseURL: host
})

//* INVENTORY ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addNewProduct = async(name, qty, unit_price, wholesale_price, retail_price) => {
  try {
    const resp = await apicall.post(`/products/add`, { name, qty, unit_price, wholesale_price, retail_price }); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

export const getProducts = async() => {
  try {
    const resp = await apicall.get(`/products/`); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

export const addInventoryQty = async(product_id, qty) => {
  try {
    const resp = await apicall.put(`/products/add-qty`, { product_id, qty }); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}


export const getProductById = async(id) => {
  try {
    const resp = await apicall.get(`/product/${id}`); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

//* REQUESTS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createRequest = async(products) => {
  
  try {
    const resp = await apicall.post(`/request/`, {
      products,
      user: "dilan"
    }); 
    return resp.data
  } catch (error) {
    const msg = error.response.data
    throw new Error(msg)
  }
}

export const getRequestInfo = async(id) => {
  try {
    const resp = await apicall.get(`/request/${id}`); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

export const getRequestCheck = async(id) => {
  try {
    const resp = await apicall.get(`/request/check/${id}`); 
    return resp.data
  } catch (error) {
    const msg = error.response.data.message
    throw new Error(msg)
  }
}

export const getAllRequest = async() => {
  try {
    const resp = await apicall.get(`/requests-all/`); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

export const getAllRequestByUser = async() => {
  try {
    const resp = await apicall.get(`/requests/dilan`); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

export const acceptRequest = async(id) => {
  try {
    const resp = await apicall.get(`/accept-request/${id}`);
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

//* PAYMENTS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createPayment = async(order_id, total_amount) => {
  try {
    const resp = await apicall.post(`/payment/`, { order_id, total_amount }); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

export const getPaymentById = async(id) => {
  try {
    const resp = await apicall.get(`/payment/${id}`); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

export const getPayments = async() => {
  try {
    const resp = await apicall.get(`/payments/`); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}

export const updateDeliveyDate = async(payment_id, delivery_date) => {
  console.log(payment_id, delivery_date);
  try {
    const resp = await apicall.put(`/payment/update-delivery/`, { payment_id, delivery_date }); 
    return resp.data
  } catch (error) {
    console.log(error);
    throw new Error("Error")
  }
}