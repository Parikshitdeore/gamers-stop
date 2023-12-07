import { Icon } from "@iconify/react";
import { NavLink, useNavigate} from "react-router-dom";
import { useData } from "../../context/ContextProvider";
import "./Navbar.css";
import logo from "../../assets/logo.png";
export const Navbar=({home})=>{
    const {setFilsearch}=useData()
    const navigate = useNavigate();
    return(
    <nav className="nav-main">
        <div className="nav-container" style={{boxShadow:home?"1px 1px 10px 0.5px rgba(255,255,255)":"1px 1px 3px 2px rgba(0,0,0,0.2)"}}>
        <div className="logo-container"  onClick={()=>navigate("/")} >
                <img src={logo} alt="none"/>
                <h3 style={{color:home?"white":"#6e6db4",background:"none"}}>Gamer's Stop</h3>
        </div>
        <div className="search-container">
        <input  style={{color:home?"white":"black"}}
        onClick={()=>navigate("/products")} 
        onChange={(event)=>{setFilsearch(event.target.value.toLowerCase().replace(" ",""))}} 
        placeholder="What are you looking for?"/>
        </div>
            <div className="links-container">

            <NavLink to="/wishlist" className="nav-links">
            <div className="icon-and-link">
            <Icon icon="mdi:heart-outline" color="#915dc2" />
            <p style={{color:home?"white":"black"}}>wishlists</p>
            </div>
            </NavLink>

            <NavLink to="/cart" className="nav-links">
            <div className="icon-and-link">
            <Icon icon="mdi:cart-outline" color="#915dc2" />
            <p style={{color:home?"white":"black"}}>Cart</p>
            </div>
            </NavLink>

            <NavLink to="/profile" className="nav-links">
            <div className="icon-and-link">
            <Icon icon="iconamoon:profile" color="#915dc2" />
            <p style={{color:home?"white":"black"}}>Profile</p>
            </div>
            </NavLink>
            </div>
        </div>
    </nav>
        
    )
}