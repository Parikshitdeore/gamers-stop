import "./checkout.css"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthProvider';
import { Addresses } from '../../components/Addresses';
import { useCart } from "../../context/CartProvider";
import { CartProduct } from "../../components/CartProduct";
import { useNavigate } from "react-router-dom"
import PriceDetails from "../../components/PriceDetails";
import { useData } from "../../context/ContextProvider";

export default function Checkout () {
  const {setIsLoading,setTitle}=useData();
  const {cartState:{cart},clearCart}= useCart();
  const {selAddress}=useAuth();
  const {name,houseNo,city,state,country,zip}=selAddress;
  const [showAddModal,setShowAddModal]=useState(false);
  const [showOrderModal,setShowOrderModal]=useState(false);
  const navigate = useNavigate()

  const placeOrderHandler=()=>{
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Your Order Has Been Placed");
      setTimeout(() => {
        setIsLoading(false)
        clearCart()
        navigate("/");
      }, 500);
    }, 1000);
    
  }

  useEffect(() => setTitle("Checkout"));
  
  return (
    <div className='checkout-container' >
      <div className='checkout-summary-container'>
        <div className='checkout-address-container'>
          <div className="address-brief">
          <h3>Delivery Address</h3>
          <p>{name} ,{houseNo}, {city}, {state}, {country}, {zip}</p>
          </div>
          <button className="address-change-btn" onClick={()=>setShowAddModal(true)}>Change</button>
          { 
          showAddModal && 
          <div>
            <div className='address-modal-wrapper' onClick={()=>setShowAddModal(false)}></div>

            <div className="address-modal"><Addresses/></div>
            
          </div>}
        </div>
          
        <div className='order-change-container'>
          <div className="order-brief">
          <h3>Order Summary</h3>
          <p>{cart.length} Item</p>
          </div>
          
          <div>
          <button className="order-update-btn" onClick={()=>setShowOrderModal(true)}>Update</button>
           {showOrderModal && 
            <div>
              <div className='order-modal-wrapper' onClick={()=>setShowOrderModal(false)}></div>
              <div className="order-modal">
            {
              cart.map((prod)=>{
                return(
             <div><CartProduct prod={prod} cartPage/></div>
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
          <p>{houseNo}, {city}, {state}, {country}, {zip}</p>
          <button className="place-order-btn" onClick={()=>{placeOrderHandler()}}>Place Order</button>
        </div>
      </div>
    </div>
  )
}
