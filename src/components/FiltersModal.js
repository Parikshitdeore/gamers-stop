import "./filtersModal.css"
import { useData } from "../context/ContextProvider"

export const FiltersModal=({setShowModal})=>{

    const {state:{categories},filcat,setFilcat,filrat,setFilrat,sortRate,setSortRate,setFilsearch}=useData()
    
    const rating = [4,3,2,1]
   
    const filcatHandler=(event)=>{
        return filcat.includes(event.target.value)?
        setFilcat((prev)=>prev.filter((cat)=>cat!==event.target.value)):
        setFilcat((prev)=>[...prev,event.target.value])
        }
    const filratHandler=(event)=>{
        setFilrat(event.target.value)
        }
    const sortRateHandler=(event)=>{
        setSortRate(event.target.value)
        }
    const ClearHandler=()=>{
        setFilcat([])
        setFilrat()
        setSortRate()
        setFilsearch()
    }

return(
    <div className="filters-modal-container">
    <div className="filters-modal-wrapper" onClick={()=>setShowModal(false)}></div>
    <div className="filters-modal">

        <div className="filter-header">
        <h2>Filters</h2>
        <p onClick={ClearHandler}>Clear</p>
        </div>
        <ul className="filters">
        <h3>Categories</h3>
            {categories.map((catg)=>{
                const {name,id}= catg
            return(
                <label>
                     <input key={id} value={name} checked={filcat.includes(name)} onClick={filcatHandler} type="checkbox"></input>{name.charAt(0).toUpperCase()+name.slice(1)}
                 </label>
                 )
             })}

        <h3>Rating</h3>
        {
        rating.map((rat,i)=>{
            return (
            <label key={i}>
                <input value={rat} checked={Number(filrat)===rat} onChange={filratHandler} type="radio"></input>{`${rat} Stars & above`}
            </label>)
        })
        }
        <h2>Sort by</h2>
        <h3>Sort By Price</h3>
        <label>
            <input  value="low" checked={sortRate==="low"} onChange={sortRateHandler} type="radio"></input>Low to High
        </label>
        <label>
            <input  value="high" checked={sortRate==="high"} onChange={sortRateHandler} type="radio"></input>High to Low
        </label>
        <h3>Sort By Rating</h3>
                <label>
                    <input value="high" checked={sortRate==="high"} onChange={sortRateHandler} type="radio"></input>High to Low
                </label>
                <label>
                    <input value="low" checked={sortRate==="low"} onChange={sortRateHandler} type="radio"></input>Low to High
                </label>
        </ul>
</div>
</div>
)
}