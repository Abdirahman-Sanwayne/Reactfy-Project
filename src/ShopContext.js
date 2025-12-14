import { createContext, useContext, useReducer } from "react";
import ShopReducer, { initialState } from "./ShopReducer";

export const ShopContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShopReducer, initialState);

  const AddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: { product: product } });
  };
  const RemoveFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: id },
    });
  };

  const AddProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: { product: product } });
  };

  const values = {
    products: state.products,
    cart: state.cart,
    total: state.total,
    AddToCart,
    RemoveFromCart,
    AddProduct,
  };

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};

const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

export default useShop;
