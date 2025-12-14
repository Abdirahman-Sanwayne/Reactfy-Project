import styles from "./Cart.module.css";
import CartItems from "../components/cart/CartItems";
import CartPayment from "../components/cart/CartPayment";
import useShop from "../ShopContext";

const Cart = () => {
  const { cart } = useShop(); // Destructuring cart from the context
  return (
    <div>
      {cart.length === 0 ? (
        <h2 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
          Cart is empty
        </h2>
      ) : (
        <div className={styles.cartContainer}>
          <CartItems />
          <CartPayment />
        </div>
      )}
    </div>
  );
};

export default Cart;
