import "./App.css"
import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products/Products";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Cart } from "./pages/Cart/Cart";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { useData } from "./context/ContextProvider.js";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";
import Auth from "./components/Auth";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup.js.js";
import Loader from "./components/Loader.js";

function App() {
  const {isLoading}=useData();
  return (
  <div className="App">
    <header>
      <Navbar/>
    </header>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/products" element={<Products isProd/>} />
  <Route path="/checkout" element={<Checkout/>}/>
  <Route path="/product/:id" element={<ProductDetail/>} />
  <Route path="/wishlist" element={<Auth><Wishlist/></Auth>}/>
  <Route path="/cart" element={<Auth><Cart/></Auth>}/>
  <Route path="/profile" element={<Auth><Profile/></Auth>} />
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
</Routes>

<ToastContainer autoClose={3000} theme="colored" position="bottom-left" />
{isLoading && <Loader/>}
    </div>
  );
}
export default App;
