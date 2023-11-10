import "./cart.css"
import { toast } from 'react-toastify';
import { CartProduct } from "../../components/CartProduct";
import { useCart } from "../../context/CartProvider"
import PriceDetails from "../../components/PriceDetails";
import {useNavigate} from "react-router-dom"
import empty from "../../assets/empty.png";
import { useEffect } from "react";
import { useData } from "../../context/ContextProvider";

export const Cart =()=>{
    const {cartState:{cart}}= useCart();
    const navigate = useNavigate();
    const {setTitle}=useData();
    useEffect(() => setTitle("Cart"));

    return(
      <div className="cart-bg">
    <div className="cart-container">
    <h2>My Cart</h2>
    <div className="cart-page">
     <div className="cart">
     {
        cart.length===0 && 
        <div className="empty-cart"> 
        <img  src={empty} alt="none"/>
        </div>
    }
       <div className="products">
             {
              cart.map((prod)=>{
                return(
             <CartProduct prod={prod} cartPage/>
           )
          })
         }
       </div>
      </div>
        <div className="price-details-container">
          <PriceDetails/>
          <button onClick={()=>{cart.length!==0?navigate("/checkout"):toast.error("Cart is Empty.")}}>Check Out</button>
        </div>
        </div>
    </div>
    </div>
    )
}