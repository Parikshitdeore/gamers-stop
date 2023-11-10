import "./productDetail.css"
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom"
import { useData } from "../context/ContextProvider";
import { useCart } from "../context/CartProvider";
import { useWishlist } from "../context/WishlistProvider";
import { useAuth } from "../context/AuthProvider";

export default function ProductDetail() {
    const navigate = useNavigate();
    const {addCart,inCart}=useCart();
    const {state:{products}}=useData()
    const {id} = useParams();
    const prod=products.find((prod)=>prod.id===id)
    const { _id,
    name,
    price,
    discountPercent,
    discountPrice,
    image,
    rating,
    description}=prod
    const {addWishlist,remWishlist,inWishlist}=useWishlist()
    const {isLoggedIn,notLoggedIn}= useAuth();
  return (
    <div className="prod-detail-container">
    <div className="prod-detail">
      <div className="image-section">
      <img src={image} alt="none"/>
      <div className="prod-detail-btns">
      {discountPercent!==0?
            <div className="discount-tag">{discountPercent+"%OFF"}</div>:
            <div className="no-discount"></div>
          }
          <div className="wishlist-btn">
                {inWishlist(_id)?
            <Icon icon="mdi:cards-heart" color="red" height={24} onClick={()=>remWishlist("REM_WISHLIST",_id)}/>:
            <Icon icon="mdi:cards-heart-outline" color="#393939" height={24} onClick={()=>isLoggedIn?addWishlist("ADD_WISHLIST",prod):notLoggedIn()}/>
              }
              </div>
      </div>
      </div>
        <div className="detail-section">
         <div className="detail-section-1">
          <h2>{name}</h2>
          <div className="price">
                    <p className="bold-price">Rs.{discountPrice}</p><p><s>Rs.{price}</s></p></div>
          <div>rating (icon) : {rating}</div>
          </div>
        <p><b>Description:</b>{description}</p>
        {
          inCart(_id)?
          <button onClick={()=>navigate("/cart")}>Go To Cart</button>:
          <button onClick={()=>{isLoggedIn?addCart("ADD_CART",prod):notLoggedIn()}}>Add to Cart</button>
        }
    </div>
        </div>
    </div>
     
  )
}
