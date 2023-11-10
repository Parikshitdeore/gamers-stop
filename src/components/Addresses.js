import "./addresses.css";
import { useState } from "react";
import { useData } from "../context/ContextProvider";
import { AddressCard } from "./AddressCard";
import { AddressModal } from "./AddressModal";
import { useAuth } from "../context/AuthProvider";

export const Addresses =()=> {
    const [showModal,setShowModal]=useState(false);
    const [showUpdateModal,setShowUpdateModal]=useState(false);
    const {state:{addresses}}=useData();
    const [updateId,setUpdateId]=useState();
    const {selAddress,setSelAddress}=useAuth();
 
    addresses.sort((a,b)=>a.id-b.id)
    
    if(addresses.length===1||selAddress===null){
        setSelAddress(addresses[0])
    }
    return (
        <div className="address-content">
         {
            addresses.map((add)=>{return<AddressCard add={add} setUpdateId={setUpdateId} setShowUpdateModal={setShowUpdateModal}/>})
             }
            <button className="add-address-btn" onClick={()=>setShowModal(true)}>Add new Address</button>
        {
            showModal && 
        <div>
            <div className="address-modal-wrapper" onClick={()=>setShowModal(false)}>
                </div>
            <AddressModal setShowUpdateModal={setShowUpdateModal} setShowModal={setShowModal}/>
        </div>
        }

        {
            showUpdateModal && 
            <div>
                <div className="address-modal-wrapper" onClick={()=>setShowUpdateModal(false)}></div>

                <AddressModal update={"update"} updateId={updateId} setShowModal={setShowModal} setShowUpdateModal={setShowUpdateModal}/>
            </div>
            
        }
        </div>
    )
}
