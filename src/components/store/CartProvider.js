import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
     let updatedItems;
     const index = state.items.findIndex(el => el.id === action.item.id);
     if (index === -1) {
        updatedItems = [...state.items, action.item];
     } else {
        updatedItems = [...state.items];
        updatedItems[index].amount += action.item.amount;
     }

     return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount
     };
  }
  if (action.type === "REMOVE") {
     let updatedItems;
     const index = state.items.findIndex(el => el.id === action.id);
     if (state.items[index].amount === 1) {
        updatedItems = state.items.filter(el => el.id !== action.id);
     } else {
        updatedItems = [...state.items];
        updatedItems[index].amount -= 1;
     }

     return {
        items: updatedItems,
        totalAmount: Math.abs(state.totalAmount - state.items[index].price)
     };
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
