import React, { createContext, useContext, useReducer} from 'react'
import { toast } from 'react-toastify';
export const WishlistContext = createContext();

const wishlistReducer=(state,action)=>{
switch (action.type) {
  case "ADD_WISHLIST":{
    return {...state,wishlist:action.payload}
  }
  case "REM_WISHLIST":{
    return {...state,wishlist:action.payload}
  }
  case "SET_WISHLIST":{
    return {...state,wishlist:action.payload}
  }
  default:
    break;
}
}

export default function WishlistProvider({children}) {

  const [wishlistState,wishlistDispatch]=useReducer(wishlistReducer,{wishlist:[]});

  const inWishlist=(id)=>{
    return wishlistState.wishlist.find((item)=>item._id===id)
  }

  const token = localStorage.getItem("token")

const addWishlist= async (actionType,product)=>{
 
  try{
      const response = await fetch("/api/user/wishlist", {
            method: "POST",
            headers: { authorization: token },
            body: JSON.stringify({product}),
        });
         const data = await response.json()
        wishlistDispatch({type:actionType,payload:data.wishlist})
        toast.success(`${product.name} Added To Wishlist`)
      }
    catch(e){
        console.log(e)
  }
}
const remWishlist= async (actionType,id)=>{
  const removedItem = wishlistState.wishlist.find((item)=>item._id===id)
  try{
      const response = await fetch(`/api/user/wishlist/${id}`, {
            method: "DELETE",
            headers: { authorization: token },
        });
         const data = await response.json()
        wishlistDispatch({type:actionType,payload:data.wishlist})
        toast.warn(`${removedItem.name} Removed From Wishlist`)
      }
    catch(e){
        console.log(e)
  }
}
  return (
    <WishlistContext.Provider value={{addWishlist,remWishlist,wishlistState,wishlistDispatch,inWishlist}}>{children}</WishlistContext.Provider>
  )
}

export const useWishlist =()=> useContext(WishlistContext)