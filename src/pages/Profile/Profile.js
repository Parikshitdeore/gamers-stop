import "./profile.css"
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/ContextProvider";
import { Addresses } from "../../components/Addresses/Addresses";

export const Profile =()=>{
    const [sel,setSel]=useState("profile");
    const {user}=useData();
    const {firstName,email}=user??"";
    const {setTitle}=useData();

    const {performLogout}=useAuth()
  

    const getstyle=(active)=>{
      return sel===active?
         {
            fontWeight: "large",
            color: "#915dc2",
            textDecoration: "none",
            borderBottom: "3px solid #915dc2",
            backgroundColor:"rgb(255, 240, 255)",
          }:
        {  
        }
    }

    useEffect(() => setTitle("Profile"));

    return(
    <div>
        <div className="profile-container">
            <div className="welcome-box"><p>Hello,{firstName??"user"}</p>
            </div>
            <div className="profile-nav-box">
                <div className="profile-nav-buttons">
                <button style={getstyle("profile")} onClick={()=>setSel("profile")}>Profile</button>
                <button style={getstyle("address")} onClick={()=>setSel("address")}>My Address</button>
                <button style={getstyle("settings")} onClick={()=>setSel("settings")}>Settings</button>
                </div>

                <div className="adjust-content">
                {
                sel==="profile"?
                <div className="profile-content">
                    <p><strong>Username:</strong>{firstName}</p>
                    <p><strong>Email:</strong>{email}</p>
                </div>

                :sel==="address"?<Addresses />
                
                
                :<div className="settings-content">
                    <button className="logout-btn" onClick={()=>{performLogout()}}>
                    Logout
                     </button>
                </div>
                }
                </div>
            </div>
        </div>
    </div>)
}