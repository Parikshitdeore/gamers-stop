import "./addressCard.css";
import { toast } from 'react-toastify';
import { useAuth } from "../context/AuthProvider";
import { useData } from "../context/ContextProvider"

export function AddressCard ({setUpdateId,add,setShowUpdateModal}){
  const {selAddress,setSelAddress}=useAuth();
  const {dispatch}=useData();
  const {id,name,houseNo,city,state,country,zip,phoneNo}=add;
  
    return (
      <div key={id} className="address-card" onClick={()=>setSelAddress(add)}>
        <div className="address-toggle">
        <input type="radio" checked={add.id===selAddress.id} onChange={()=>setSelAddress(add)} name="address"/>
        </div>
      <div className="address-card-details">
        <div >
          <h2>{name}</h2>
          <p>{houseNo}</p>
          <p>{city},{state}</p>
          <p>{zip}</p>
          <p>{country}</p>
          <p>{phoneNo}</p>
        </div>
        <button className="update-btn" onClick={()=>{setShowUpdateModal(true);setUpdateId(id)}}>Update</button>
        <button className="remove-btn" onClick={()=>{dispatch({type:"REM_ADDRESS",payload:id});toast.error("Address Removed")}}>Remove</button>
        </div>

      </div>
    )
}