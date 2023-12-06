import { useNavigate } from "react-router-dom"
import { useData } from "../context/ContextProvider"

export const Categories=()=>{
    const {state:{categories},setFilcat}=useData()
    const navigate = useNavigate()
    return (
        <div className="categories-container">
            <h2>Categories</h2>
        <div className="home-categories">
            {
                categories.map((catg)=>{
                    const {name,id,image}= catg
                return(
                    <div className="single-category-container" onClick={()=>{setFilcat([name]);navigate("/products")}} key={id}>
                        <img  src={image} alt="none"/>
                        <h3>{name}</h3>
                    </div>
                     )
                 })
            }
        </div>
        </div>
    )
}