import { useEffect } from "react";
import { Footer } from "../../components/Footer"
import "./home.css"
import { useData } from "../../context/ContextProvider";
export const Home =()=>{

    const {setTitle}=useData();

    useEffect(() => setTitle("Home"));
    return(
    <div className="home-container">
        <h1>Home</h1> 
    <Footer/>
    </div>)
}