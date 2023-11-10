import "./filters.css"
import { useData } from "../context/ContextProvider"

export const Filters =()=>{

    const {state:{categories},filcat,setFilcat,filrat,setFilrat,sortPrice,sortRate,setFilsearch,setSortPrice,setSortRate}=useData()
    
    const rating = [4,3,2,1]
   
    const filcatHandler=(event)=>{
        return filcat.includes(event.target.value)?
        setFilcat((prev)=>prev.filter((cat)=>cat!==event.target.value)):
        setFilcat((prev)=>[...prev,event.target.value])
        }
    const filratHandler=(event)=>{
        setFilrat(event.target.value)
        }
    const sortPriceHandler=(event)=>{
        setSortPrice(event.target.value)
        }
    const sortRateHandler=(event)=>{
        setSortRate(event.target.value)
        }
    const ClearHandler=()=>{
        setFilcat([])
        setFilrat()
        setSortPrice()
        setSortRate()
        setFilsearch()
    }

    return (
        <div>
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
                             <input key={id} value={name} checked={filcat.includes(name)} onChange={filcatHandler} type="checkbox"></input>{name.charAt(0).toUpperCase()+name.slice(1)}
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
                    <input  value="low" checked={sortPrice==="low"} onChange={sortPriceHandler} type="radio"></input>Low to High
                </label>
                <label>
                    <input  value="high" checked={sortPrice==="high"} onChange={sortPriceHandler} type="radio"></input>High to Low
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
    )
}