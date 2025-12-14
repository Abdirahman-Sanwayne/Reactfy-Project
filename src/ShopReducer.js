import { useEffect } from "react";

const safeParse = (key) => {
  const value = localStorage.getItem(key);
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};
const cart = safeParse("cart");
export const initialState = {
  products: safeParse("products"),
  cart: safeParse("cart"),
  total: cart.reduce((total, item) => total + item.price, 0),
};

const ShopReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, payload.product],
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, payload.product],
        total: state.total + payload.product.price,
      };
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter((item) => item.id !== payload.id);
      const updatedTotal = updatedCart.reduce(
        (total, item) => total + item.price,
        0
      );
      return {
        ...state,
        cart: updatedCart,
        total: updatedTotal,
      };
    default:
      throw new Error("Invalid reducer action type");
  }
};

export default ShopReducer;
