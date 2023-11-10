import { createContext, useContext, useEffect, useReducer, useState } from "react"

export const GamerContext=createContext();

export const ContextProvider =({children})=>{
    const [filcat,setFilcat]=useState([]);
    const [filrat,setFilrat]=useState(false);
    const [sortPrice,setSortPrice]=useState();
    const [sortRate,setSortRate]=useState();
    const [filSearch,setFilsearch]=useState();
    const [isLoading,setIsLoading]=useState(false);

    const gameReducer=(state,action)=>
    {
        switch (action.type) {
        case "SET_PRODUCTS":
        return {...state,products:action.payload}
    
        case "SET_CATEGORIES":
        return {...state,categories:action.payload}

        case "ADD_WISHLIST":
        return {...state,wishList:[...state.wishList,action.payload]}

        case "REM_WISHLIST":
          let newWL=state.wishList.filter((prod)=>prod.id!==action.payload.id)
        return {...state,wishList:newWL}

        case "SET_USER":
        return {...state,user:action.payload}

        case "SET_DEFAULT_ADDRESS":{
            return {...state,addresses:[action.payload]}
        }

        case "ADD_ADDRESS":{
            action.payload.id=state.addresses.length+1
            return {...state,addresses:[...state.addresses,action.payload]}
        }

        case "UPDATE_ADDRESS":{
            const updatedAddress=state.addresses.filter((add)=>add.id!==action.payload.id)
            console.log(updatedAddress)
            return {...state,addresses:[...updatedAddress,action.payload]}
        }
        
        case "REM_ADDRESS":{
            const newAddresses=state.addresses.filter((add)=>add.id!==action.payload)
            return {...state,addresses:newAddresses}
        }

         default:
         break;
        }

    }
    const [state,dispatch]=useReducer(gameReducer,
        {products:[],categories:[],wishlist:[],addresses:[]}
        )

    const getData= async()=>{
        try {
            const res =await ((await fetch("/api/products")).json())
            dispatch({type:"SET_PRODUCTS",payload:res.products})                                                                        
            
            const res2 = await (await fetch("/api/categories")).json()
            dispatch({type:"SET_CATEGORIES",payload:res2.categories})
            
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const applyFilters=(data)=>{
        let filteredData = [...data]

        if(filcat.length>0){
           filteredData=filteredData.filter((prod)=>filcat.includes(prod.category))
        }
        if(filrat){
             filteredData=filteredData.filter((prod)=>prod.rating>=parseInt(filrat))
        }
        if(filSearch){
            filteredData=filteredData.filter((prod)=>prod.name.toLowerCase().includes(filSearch))
        }
        if(sortPrice){
            sortPrice==="low"?
            filteredData=filteredData.sort((a,b)=>a.price-b.price):
            filteredData=filteredData.sort((a,b)=>b.price-a.price)
        }
        if(sortRate){
            sortRate==="low"?
            filteredData=filteredData.sort((a,b)=>a.rating-b.rating):
            filteredData=filteredData.sort((a,b)=>b.rating-a.rating)
        }

        return filteredData
    }

    const filteredData = applyFilters(state.products)

    const setTitle = (title) => {
        document.title = `${title} | SnapShop`;
      };
    

    return (
        <GamerContext.Provider value={{
            filteredData,
            state,
            dispatch,
            filcat,
            filrat,
            setFilrat,
            setFilcat,
            sortPrice,
            sortRate,
            setSortPrice,
            setSortRate,
            filSearch,
            setFilsearch,
            user:state.user,
            isLoading,
            setIsLoading,
            setTitle,
        }}>{children}</GamerContext.Provider>
    )
}
export const useData=()=>useContext(GamerContext)
