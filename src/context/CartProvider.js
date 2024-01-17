import React, { createContext, useContext, useReducer} from 'react'
import { toast } from 'react-toastify';
export const CartContext = createContext();

const cartReducer=(state,action)=>{
switch (action.type){
  case "ADD_CART":{ 
    return {...state,cart:[...action.payload.cart]}
  }
  case "REM_CART":{ 
    return {...state,cart:[...action.payload.cart]}
  }
  case "INCREMENT":{
    return {...state,cart:[...action.payload.cart]}
  }
  case "DECREMENT":{
    return {...state,cart:[...action.payload.cart]}
  }
  case "SET_CART":{
    return {...state,cart:action.payload}
  }
  case "CLEAR_CART":{
    return {...state,cart:[]}
  }
  default:
    break;
}
}
export default function CartProvider({children}) {

  const [cartState,cartDispatch]=useReducer(cartReducer,{cart:[]})
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  const inCart=(id)=>{
    return cartState.cart.find((item)=>item._id===id)
  }

  const addCart= async (actionType,product)=>{
    if(user!==null){
      try{
        const response = await fetch("/api/user/cart", {
              method: "POST",
              headers: { authorization: token},
              body: JSON.stringify({product}),
          });
           const data = await response.json()
           cartDispatch({type:actionType,payload:data})
           toast.success(`${product.name} Added to Cart`)
        }catch(e){
          console.log(e)
        }
    }
    }

    const deleteCart = async (actionType,id)=>{
      const deletedItem = cartState.cart.find((item)=>id===item._id)
      try {
            const res = await fetch(`/api/user/cart/${id}`,{
            method:"DELETE",
            headers:{ authorization: token}
          })
          const data = await res.json()
          cartDispatch({type:actionType,payload:data})
          toast.warn(`${deletedItem.name} removed from cart`)
      } catch (e) {
        console.log(e)
      }
    }

    const clearCart = async (actionType,id)=>{
      try {
            const res = await fetch(`/api/user/cart/${id}`,{
            method:"DELETE",
            headers:{ authorization: token}
          })
          const data = await res.json()
          cartDispatch({type:actionType,payload:data})
      } catch (e) {
        console.log(e)
      }
    }
   
    const changeQuantity = async (actionType,product)=>{
      var body = actionType==="INCREMENT"?{action:{type:"increment"}}:{action:{type:"decrement"}}
      try {
            console.log(body)
            const res = await fetch(`/api/user/cart/${product._id}`,{
            method:"POST",
            headers:{ authorization: token},
            body:JSON.stringify(body)
            })
          const data = await res.json()

          cartDispatch({type:actionType,payload:data})

           } catch (e) {
        console.log(e)
      }
    }

  return (
    <CartContext.Provider value={{cartState,cartDispatch,inCart,addCart,deleteCart,changeQuantity,clearCart}}>{children}</CartContext.Provider>
  )
}
export const useCart=()=> useContext(CartContext)