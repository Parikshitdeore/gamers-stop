import { useNavigate } from "react-router-dom"
import { useData } from "../context/ContextProvider"

export const Categories=()=>{
    const {state:{categories},setFilcat}=useData()
    const navigate = useNavigate()
    return (
        <div className="categories-container">
            {
                categories.map((catg)=>{
                    const {name,id}= catg
                return(
                    <div onClick={()=>{setFilcat([name]);navigate("/products")}} key={id}>
                        <img  src="" alt="none"/>
                        <h2>{name}</h2>
                    </div>
                     )
                 })
            }
        </div>
    )
}