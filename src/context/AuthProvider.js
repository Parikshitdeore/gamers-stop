import React, { createContext, useContext, useState } from 'react'
import { useData } from './ContextProvider';
import { useCart } from './CartProvider';
import { useWishlist } from './WishlistProvider';
import {toast} from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import {users} from "../backend/db/users"

export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const {setIsLoading,dispatch}=useData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {cartDispatch}=useCart();
  const {wishlistDispatch}=useWishlist();
  const [selAddress,setSelAddress]= useState();

  
  let navigate = useNavigate();
  let location = useLocation();

  const notLoggedIn=()=>{
    toast.error("Please Login First")
    navigate("/login")
  }

  let defaultAddress = {
    id: 1,
    name: "Parikshit Deore",
    houseNo: "Jupitar 801,Galaxy",
    city: "Nashik",
    state: "Maharashtra",
    country: "India",
    zip: "422004",
    phoneNo: "9421404040",
  };

  var demodetails = { 
    email: "",
    password: "",
  }

  const performLogin = async (email,password) => {
    demodetails={email,password}
    setIsLoading(true)
    setIsLoggedIn(true)
    try {
      const response = await fetch("/api/auth/login",{
        method:"POST",
        body:JSON.stringify(demodetails)
      });

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.foundUser))
      localStorage.setItem("token", data.encodedToken)
      dispatch({type:"SET_USER",payload:data.foundUser})
      cartDispatch({type:"SET_CART",payload:data.foundUser.cart})
      wishlistDispatch({type:"SET_WISHLIST",payload:data.foundUser.wishlist})
      if(demodetails){
        setTimeout(() => {
          setIsLoggedIn(true)
          toast.success("Login Successful")
          navigate("/products")
          setSelAddress(defaultAddress)
          dispatch({ type: "SET_DEFAULT_ADDRESS", payload: defaultAddress })
          setIsLoading(false)
        }, 500);
      }
    } catch (e) {
      console.error(e);
      localStorage.clear();
      setIsLoading(false)
      setIsLoggedIn(false)
      toast.error("Login Failed")
  }
}

const performSignUp = async (email,password,firstName,lastName) => {
 
  if(email && password && firstName && lastName){
    if(users.find((user)=>user.email!==email)){
      const userDetails = {email,password,firstName,lastName}
      setIsLoading(true)
      if(email.includes(`@`) && email.includes(`.com`)){
        try {
          const response = await fetch("/api/auth/signup",{
          method:"POST",
          body:JSON.stringify(userDetails)
        });
        const data = await response.json();
        console.log(data)
        // localStorage.setItem("user", JSON.stringify(data.createdUser))
        // localStorage.setItem("token", data.encodedToken)
        // dispatch({type:"SET_USER",payload:data.createdUser})
        // cartDispatch({type:"SET_CART",payload:data.createdUser.cart})
        // wishlistDispatch({type:"SET_WISHLIST",payload:data.createdUser.wishlist})
        if(userDetails){
          setTimeout(() => {
            toast.success("Account created")
          defaultAddress.name=`${firstName} ${lastName}`
          dispatch({ type: "SET_DEFAULT_ADDRESS", payload: defaultAddress })
          }, 100);
  
        if(userDetails)setTimeout(() => {
          performLogin(email,password)
        }, 500);
      
        }
      } catch (e) {
        console.error(e);
        setIsLoggedIn(false)
        setIsLoading(false)
        localStorage.clear();
        toast.error("Signup Failed")
    }
      }
    else {
      setIsLoading(false)
      setIsLoggedIn(false)
      localStorage.clear();
      toast.error("Incorrect email")
  }
    }
    else{
      toast.error("Email is already registered")
    }
  }
  else{
    toast.error("Please fill in the details") 
  }
}

const performLogout=()=>{
  setIsLoading(true)
  setTimeout(() => {
    setIsLoggedIn(false);
    navigate(location?.state?.from?.pathname);
    localStorage.clear();
    toast.success("Logged Out Successfully")
    setIsLoading(false)
  }, 500);
 
}
  
  return (
    <AuthContext.Provider value={{isLoggedIn,notLoggedIn,setIsLoggedIn,performLogin,performSignUp,selAddress,setSelAddress,performLogout}}>{children}</AuthContext.Provider>
  )
}
export const useAuth =()=>useContext(AuthContext)