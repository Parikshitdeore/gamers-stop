import "./wishlist.css"
import { ProductCard } from "../../components/ProductCard";
import { useWishlist } from "../../context/WishlistProvider";
import empty from "../../assets/empty.png";
import { useData } from "../../context/ContextProvider";
import { useEffect } from "react";

export const Wishlist =()=>{
    const {setTitle}=useData();
    const {wishlistState:{wishlist}}=useWishlist();

    useEffect(() => setTitle("Wishlist"));
    return(
      <div className="wishlist-bg">
    <div className="wishlist-container">
     <h2>My Wishlist</h2>
     {
     wishlist.length===0 && 
     <div className="empty-wishlist"><img  src={empty} alt="none"/></div>
     }
    <div className="wishlist">
     {
      wishlist.map((prod)=>{
         return(
          <div key={prod._id}>
           <ProductCard prod={prod} wishlistPage/>
          </div>    
          )
            })
     }
    </div>
    </div>
    </div>)
}