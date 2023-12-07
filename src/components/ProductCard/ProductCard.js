import "./productcard.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartProvider";
import { useWishlist } from "../../context/WishlistProvider";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { BtnLoader } from "../BtnLoader/BtnLoader";

export const ProductCard =({prod,cartPage,wishlistPage})=>{
    const {isLoggedIn,notLoggedIn}= useAuth();
    const navigate = useNavigate();
    const {addCart,inCart}=useCart();
    const [isBtnLoading,setIsBtnLoading]=useState(false)
    const {addWishlist,remWishlist,inWishlist}= useWishlist()
    const {
        _id,
        name,
        image,
        price,
        discountPrice,
        discountPercent,
        rating,
      } = prod;
 
  const moveToCart=()=>{
    addCart("ADD_CART",prod);
    remWishlist("REM_WISHLIST",_id);
  }
  const handleCartClick=()=>{
    if(isLoggedIn){
        setIsBtnLoading(true)

        if(!wishlistPage){
            if(!inCart(_id)){
                addCart("ADD_CART",prod)
                setTimeout(() => {
                    setIsBtnLoading(false)
                }, (500));
            }
            else{
            navigate("/cart")
            }
        }

        if(wishlistPage){
            if(!inCart(_id)){
                moveToCart()
                setTimeout(() => {
                    setIsBtnLoading(false)
                }, (500));
            }
            else{
                navigate("/cart")
            }
        }
    }
    else{
        notLoggedIn()
    }
  }
  
    return(
    <div className="product-card">
        <div className="product-image-container" onClick={()=>navigate(`/product/${_id}`)}>
        <img src={image} alt="none"/>
        </div>
        <div className="extra-btns">
          {discountPercent!==0?
            <div className="discount-tag">{discountPercent+"%OFF"}</div>:
            <div className="no-discount"></div>
          }
         {/*Other pages except cart page */}
            {!cartPage && <div className="wishlist-btn">
                {inWishlist(_id)?
                <Icon className="w-btn" icon="mdi:cards-heart" color="red" height={24} onClick={()=>remWishlist("REM_WISHLIST",_id)}/>
                :
                <Icon className="w-btn" icon="mdi:cards-heart-outline" color="#393939" height={24}  onClick={()=>isLoggedIn?addWishlist("ADD_WISHLIST",prod):notLoggedIn()}/>
            }
            </div>
            }
        </div>
        <div className="product-content-container">
            <div className="product-content">
                <div className="name-container">
                    <p className="name">{name}</p>
                    <p className="rating">{rating}<Icon className="rating-star" icon="material-symbols:star" color="FEC260" /></p>
                    </div>
                <div className="price">
                    <p className="bold-price">Rs.{discountPrice}</p><p><s>Rs.{price}</s></p></div>
                </div>

            {/*Products page buttons*/}
            {!wishlistPage && 
            <button onClick={()=>handleCartClick()}>{
               isBtnLoading?<BtnLoader/>:inCart(_id)?"Go To Cart":"Add to Cart"} 
            </button>
                
            }
            {/* wishlist page buttons */}
            {wishlistPage &&
            <button onClick={()=>handleCartClick()}>{
                isBtnLoading?<BtnLoader/>: inCart(_id)?"Go To Cart":"Move To Cart"}
            </button>
            }
            </div>
    </div>)
}
