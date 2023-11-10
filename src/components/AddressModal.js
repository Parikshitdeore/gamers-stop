import "./addressModal.css"
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useData } from "../context/ContextProvider";

export const AddressModal=({updateId,update,setShowModal,setShowUpdateModal})=> {
  
  const {state:{addresses},dispatch}=useData();
  const [address,setAddress]=useState({
    name:"",
    houseNo:"",
    city:"",
    state:"",
    country:"",
    zip:"",
    phoneNo:""
  });

  const dummyAddress = {
    id: addresses.length+1,
    name: "Parikshit Deore",
    houseNo: "1501/B1,Tharwani Complex",
    city: "Thane",
    state: "Maharashtra",
    country: "India",
    zip: "421000",
    phoneNo: "9421808080",
  };

  useEffect(()=>{
    if(updateId){
      const updateAddress=addresses.find((add)=>add.id===updateId)
      setAddress(updateAddress)}
      },[])
      
    return (
      <div className="form-modal">
        <header>{update?"Update":"Add"} Address</header>
        <div className="form-container">
        <fieldset>
            <legend>Name</legend>
             <input type="text" onChange={(e)=>setAddress({...address,name:e.target.value})} value={address.name} placeholder="Parikshit Deore"></input>
        </fieldset>

        <fieldset>
          <legend>House No.</legend>
          <input type="text" onChange={(e)=>setAddress({...address,houseNo:e.target.value})} value={address.houseNo} placeholder="1501/B1,Tharwani Complex"></input>
        </fieldset>

        <fieldset>
          <legend>City</legend>
         <input type="text" onChange={(e)=>setAddress({...address,city:e.target.value})} value={address.city} placeholder="Thane"></input>
        </fieldset>

        <fieldset>
         <legend>State</legend>
         <input type="text" onChange={(e)=>setAddress({...address,state:e.target.value})} value={address.state} placeholder="Maharashtra"></input>
        </fieldset>
       
        <fieldset>
         <legend>Country</legend>
         <input type="text" onChange={(e)=>setAddress({...address,country:e.target.value})} value={address.country} placeholder="India"></input>
        </fieldset>

        <fieldset>
         <legend>Pincode</legend>
         <input type="number" onChange={(e)=>setAddress({...address,zip:e.target.value})} value={address.zip} placeholder="421000"></input>
        </fieldset>

        <fieldset>
         <legend>Phone No.</legend>
         <input type="number" onChange={(e)=>setAddress({...address,phoneNo:e.target.value})} value={address.phoneNo} placeholder="9421808080"></input>
        </fieldset>
        <div className="modal-btns">
          <button onClick={()=>{setShowModal(false);setShowUpdateModal(false);dispatch({type:update?"UPDATE_ADDRESS":"ADD_ADDRESS",payload:address});toast.success(update?"Address Updated":"Address Added")}}>{update?"Update":"Add"}</button>
          <button onClick={()=>setAddress(dummyAddress)}>Dummy Address</button>
        </div>
        </div>
      </div>
    )
}
