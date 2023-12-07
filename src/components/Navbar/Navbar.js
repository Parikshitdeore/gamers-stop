import { Icon } from "@iconify/react";
import { NavLink, useNavigate} from "react-router-dom";
import { useData } from "../../context/ContextProvider";
import "./Navbar.css";
import logo from "../../assets/logo.png";
export const Navbar=()=>{
    const {setFilsearch}=useData()
    const navigate = useNavigate();
    return(
    <nav className="nav-main">
        
        <div className="nav-container">
        <div className="logo-container" onClick={()=>navigate("/")} >
                <img src={logo} alt="none"/>
                <h3>Gamer's Stop</h3>
        </div>
        <div className="search-container">
        <input 
        onClick={()=>navigate("/products")} 
        onChange={(event)=>{setFilsearch(event.target.value.toLowerCase().replace(" ",""))}} 
        placeholder="What are you looking for?"/>
        </div>
            <div className="links-container">

            <NavLink to="/wishlist" className="nav-links">
            <div className="icon-and-link">
            <Icon icon="mdi:heart-outline" color="#915dc2" />
            <p>wishlists</p>
            </div>
            </NavLink>

            <NavLink to="/cart" className="nav-links">
            <div className="icon-and-link">
            <Icon icon="mdi:cart-outline" color="#915dc2" />
            <p>Cart</p>
            </div>
            </NavLink>

            <NavLink to="/profile" className="nav-links">
            <div className="icon-and-link">
            <Icon icon="iconamoon:profile" color="#915dc2" />
            <p>Profile</p>
            </div>
            </NavLink>
            </div>
        </div>
    </nav>
        
    )
}