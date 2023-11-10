import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import { useWishlist } from '../context/WishlistProvider';
import { BtnLoader } from './BtnLoader';

export const CartProduct=({cartPage,prod})=> {
    const {deleteCart,changeQuantity}=useCart();
    const {inWishlist,addWishlist}=useWishlist();
    const [isBtnLoading,setIsBtnLoading]=useState();
    const [isDelLoading,setisDelLoading]=useState();
    const {_id,name,price,image,discountPercent,discountPrice}=prod;
    const navigate = useNavigate()

    if(prod.qty<1){
      deleteCart("REM_CART",_id)
    }

    const handleWishlistClick=()=>{
      setIsBtnLoading(true)
      setTimeout(() => {
        if(!inWishlist(_id)){
          addWishlist("ADD_WISHLIST",prod);
          deleteCart("REM_CART",_id)
          setIsBtnLoading(false)
      }
      else{
        navigate("/wishlist") 
      }
      }, 500);
      
    }
    const handleDeleteClick=()=>{
      setisDelLoading(true)
      setTimeout(() => {
        deleteCart("REM_CART",_id)
        setisDelLoading(false)
      }, 500);
    }

  return (
    <div className='cart-prod'>
      <div className='cart-prod-img' onClick={()=>navigate(`/product/${_id}`)}>
      <img src={image} alt="none"/>
      </div>
      <div className='cart-prod-detail'>
         <h3>{name}</h3>
         <div><h3>{discountPrice}</h3><s>{price}</s></div>
         <h3>{discountPercent}% Off</h3>
         <p className='quantity'>Quantity: 
            <button onClick={()=>{changeQuantity("DECREMENT",prod)}}>-</button>

            {prod.qty===0?1:prod.qty}

            <button onClick={()=>{changeQuantity("INCREMENT",prod)}}>+</button></p>
    
          {
             <div className='cart-prod-buttons'> 
            <button className='rem-cart-btn' onClick={()=>handleDeleteClick()}>{isDelLoading?<BtnLoader/>:"Remove From Cart"}</button>
  
            <button className='add-to-wishlist-btn' 
            onClick={()=>handleWishlistClick()}>{isBtnLoading?<BtnLoader/>:inWishlist(_id)?"Go To Wishlist":"Move To Wishlist"}
            </button>
            </div>
          }
      </div>
    </div>
  )
}
