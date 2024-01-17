import "./checkout.css"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthProvider';
import { Addresses } from '../../components/Addresses/Addresses';
import { useCart } from "../../context/CartProvider";
import { CartProduct } from "../../components/CartProduct/CartProduct";
import { useNavigate } from "react-router-dom"
import PriceDetails from "../../components/PriceDetails/PriceDetails";
import { useData } from "../../context/ContextProvider";
import { Icon } from '@iconify/react';

export default function Checkout () {
  const {setIsLoading,setTitle,state:{addresses}}=useData();
  const {cartState:{cart},clearCart}= useCart();
  const {selAddress}=useAuth();
  const [showAddModal,setShowAddModal]=useState(false);
  const [showOrderModal,setShowOrderModal]=useState(false);
  const navigate = useNavigate()

  const placeOrderHandler=()=>{
    setIsLoading(true);
    if(cart.length!==0 && addresses.length!==0){
      setTimeout(() => {
        toast.success("Your Order Has Been Placed");
        setTimeout(() => {
          setIsLoading(false)
          cart.map((item)=>{
          return clearCart("REM_CART",item._id)
          })
          navigate("/");
        }, 500);
      }, 1000);
    }
    else{
      setIsLoading(false)
      toast.error("There was an error while placing your Order")
    }
  }

  useEffect(() => setTitle("Checkout"));
  
  return (
    <div className='checkout-container' >
      <div className='checkout-summary-container'>
        <div className='checkout-address-container'>
          <div className="address-brief">
          <h3>Delivery Address</h3>
          {
          addresses.length!==0?<p>{selAddress.name} ,{selAddress.houseNo}, {selAddress.city}, {selAddress.state}, {selAddress.country},{selAddress.zip}</p>:<p style={{color:"red"}}>This field cannot be empty</p>
          }
          </div>
          <button className="address-change-btn" onClick={()=>setShowAddModal(true)}>{addresses.length===0?"Add address":"Change"}</button>
          { 
          showAddModal && 
          <div>
            <div className='address-modal-wrapper' onClick={()=>setShowAddModal(false)}></div>
    
            <div className="address-modal">
            <div className="address-cancel-btn" onClick={()=>setShowAddModal(false)}>
                <Icon icon="fluent-mdl2:cancel" />
            </div>
              <Addresses setShowAddModal={setShowAddModal}/></div>
          </div>}
        </div>
          
        <div className='order-change-container'>
          <div className="order-brief">
          <h3>Order Summary</h3>
          <p>{cart.length} Item</p>
          </div>
          
          <div>
          <button className="order-update-btn" onClick={()=>cart.length===0?navigate("/products"):setShowOrderModal(true)}>{cart.length===0?"Add gear":"Update"}</button>
           {showOrderModal && cart.length!==0 &&
            <div>
              <div className='order-modal-wrapper' onClick={()=>setShowOrderModal(false)}></div>
              <div className="order-modal">
              <div className="address-cancel-btn" onClick={()=>setShowOrderModal(false)}>
                <Icon icon="fluent-mdl2:cancel" />
            </div>
            {
              cart.map((prod)=>{
                return(
              <CartProduct prod={prod} cartPage/>
             )
              })
            }
            </div>
         </div>
          }
          </div>
        </div>
      </div>
      <div className='checkout-details-container'>
        <div className='order-details-card'>
          <h3>Order Details</h3>
          <p><b>Item</b><span><b>Quantity</b></span></p>
          {cart.map((prod)=><p>{prod.name}<span>{prod.qty}</span></p>)}
          <PriceDetails/>
          <h3>Deliver to</h3>
          {
          addresses.length!==0? <p>{selAddress.houseNo}, {selAddress.city}, {selAddress.state}, {selAddress.country}, {selAddress.zip}</p>:<p style={{color:"red",justifyContent:"center"}}>Please enter a valid address</p>
          }
          <button className="place-order-btn" onClick={()=>{placeOrderHandler()}}>Place Order</button>
        </div>
      </div>
    </div>
  )
}
