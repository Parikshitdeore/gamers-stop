import { useState } from "react"
import { useNavigate } from "react-router-dom";
import carousel_1 from "../../assets/carousel_2.jpg"
import carousel_2 from "../../assets/carousel_4.jpg"
import carousel_3 from "../../assets/carousel_1.jpg"
import carousel_4 from "../../assets/carousel_5.jpg"
import carousel_5 from "../../assets/carousel_3.jpg"
import { Icon } from '@iconify/react';

function Carousel() {
    const navigate = useNavigate();
    const [counter,setCounter]=useState(1);
    const [image,setImage]=useState(carousel_1);
    
    const imageSelector=()=>{
        counter===2?setImage(carousel_2)
        :counter===3?setImage(carousel_3)
        :counter===4?setImage(carousel_4)
        :counter===5?setImage(carousel_5)
        :setImage(carousel_1)
       
    }
    const nextImg=()=>{
    counter<5?setCounter(counter+1):setCounter(1);
    }
    const prevImg=()=>{
    counter>1?setCounter(counter-1):setCounter(5);
    }
    
    setTimeout(() => {
    imageSelector();
    },200);

    const activeStyle=()=>{
        return {backgroundColor:"black",border:"0.5px solid white"}
    }

  return (
    <div className="carousel-container">
      <div className="image-container">
        <img onClick={()=>{navigate("/products")}} src={image} key={counter} alt="none"/>
        <button className="carousel-next-btn" onClick={()=>{nextImg()}}><Icon icon="ooui:next-ltr"/></button>
        <button className="carousel-prev-btn" onClick={()=>{prevImg()}}><Icon icon="ooui:next-ltr" hFlip={true} /></button>
        <div className="carousel-active">
            <div onClick={()=>setCounter(1)} className="active-bar" style={counter===1?activeStyle():{}}></div>
            <div onClick={()=>setCounter(2)} className="active-bar" style={counter===2?activeStyle():{}}></div>
            <div onClick={()=>setCounter(3)} className="active-bar" style={counter===3?activeStyle():{}}></div>
            <div onClick={()=>setCounter(4)} className="active-bar" style={counter===4?activeStyle():{}}></div>
            <div onClick={()=>setCounter(5)} className="active-bar" style={counter===5?activeStyle():{}}></div>
        </div>
      </div>
    </div>
  )
}

export default Carousel