import "./products.css";
import { Icon } from '@iconify/react';
import { useData } from "../../context/ContextProvider"
import { ProductCard } from "../../components/ProductCard";
import { Filters } from "../../components/Filters";
import { useState } from "react";
import { FiltersModal } from "../../components/FiltersModal";

export const Products =()=>{
    const {filteredData}=useData()
    const [showModal,setShowModal]=useState(false)
    return (
        <div className="product-page">
            <div className="side">
                <Filters/>
            </div>
            
            <div className="main">
             <div className="products-header"><h3>Showing All Products</h3><div className="filter-icon"><Icon  onClick={()=>{setShowModal(true)}} icon="mdi:filter-outline" color="#915dc2" /></div>
            </div>
                <div className="products-container">
                {
                    filteredData.map((prod,i)=>{
                        return(
                        <div key={i}>
                        <ProductCard prod={prod} isProd/>
                        </div>    
                        )
                    })
                }
                {
                    showModal && <FiltersModal setShowModal={setShowModal}/>
                }
                </div>
            </div>
        </div>
    )
}