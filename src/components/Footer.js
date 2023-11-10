import "./footer.css"
import logo from "../assets/logo.png";
import {Link} from "react-router-dom"
import { useData } from "../context/ContextProvider";

export const Footer=()=>{
    const {state:{categories}}=useData();
    return(<div className="footer-container">
        <div className="fc-container">
        <div className="fcontainer-brand">
            <div className="brand-icon">
                <img src={logo} alt="none"/><h2>Gamer's Stop</h2>
            </div>
            <p>One stop shop for all your Gaming needs!</p>
         </div>
         <div className="fcontainer-category">
        <h3>Categories</h3>
         <div className="footer-list">
         {categories.map((catg)=>{
                        const {name,id}= catg
                    return(
                        <p className="footer-link" id={id}>{name}</p>
                         )
                     })
            }
        </div>
         </div>
         <div className="fcontainer-social"><h3>Follow Us</h3>
         <div className="footer-list">
         <p><Link className="footer-link" to="https://www.instagram.com/parikshit_deore/">Instagram</Link></p>
         <p><Link className="footer-link" to="https://twitter.com/ParikshitDeore">Twitter</Link></p>
         <p><Link className="footer-link" to="https://www.linkedin.com/in/parikshit-deore-98249415a">LinkedIn</Link></p>
         </div>

         </div>
         <div className="fcontainer-contact"><h3>Contact</h3>
         <div className="footer-list">
         <p><a className="footer-link" href="/">Email</a></p>
         <p><a className="footer-link" href="/">WhatsApp</a></p>
         </div>
         </div>
        </div>
        <div className="copyright-container"><h3>© Gamers Stop 2023</h3><p>Built with love by <Link className="copyright-link" to="https://www.linkedin.com/in/parikshit-deore-98249415a">Parikshit Deore</Link></p></div>
    </div>)
}