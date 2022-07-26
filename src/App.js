import React, { useState } from "react";
import Header from "./components/Layout/header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart"
import CartProvider from "./components/store/CartProvider";



function App() {

const [cartisShown,setCartIsShown]=useState(false);

const ShowCartHandler=()=>{
  setCartIsShown(true);
}

const hideCartHandler=()=>{
  setCartIsShown(false);
}

  return (
    <CartProvider>
    {cartisShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={ShowCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}


export default App;