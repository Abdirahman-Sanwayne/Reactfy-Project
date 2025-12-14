import styles from "./Cart.module.css";
import CartItems from "../components/cart/CartItems";
import CartPayment from "../components/cart/CartPayment";
import useShop from "../ShopContext";

const Cart = () => {
  const { cart } = useShop();

  return (
    <main className={styles.cartPage}>
      {cart.length === 0 ? (
        <h2 className={styles.emptyMessage}>Cart is empty</h2>
      ) : (
        <section className={styles.cartContainer}>
          <CartItems />
          <CartPayment />
        </section>
      )}
    </main>
  );
};

export default Cart;
