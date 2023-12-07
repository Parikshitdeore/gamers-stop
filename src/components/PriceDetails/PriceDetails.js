import React from 'react'
import { useCart } from "../../context/CartProvider"


export default function PriceDetails() {
    const {cartState:{cart}}= useCart();
    const DiscPrice = cart.reduce((acc,curr)=>acc=acc+(curr.discountPrice*curr.qty),0)
    const OgPrice = cart.reduce((acc,curr)=>acc=acc+(curr.price*curr.qty),0)
  return (
    <div className='price-details-card'>
        <h3>Price Details</h3>
        <hr></hr>
        <div><p>Price</p><p>Rs.{DiscPrice}</p></div>
        <div><p>Discount</p> <p>-Rs.{OgPrice-DiscPrice}</p></div>
        <div><p>Delivery Charges</p> <p>Rs.{cart.length>0?499:0}</p></div>
        <div><h3>Total Amount </h3><h3>Rs.{DiscPrice+(cart.length>0?499:0)}/-</h3></div>
        <hr></hr>
        <p>You will save Rs.{OgPrice-DiscPrice} on this order</p>
        <hr></hr>
        </div>
  )
}
