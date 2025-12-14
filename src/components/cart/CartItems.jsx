import useShop from "../../ShopContext";
import styles from "./CartItems.module.css";

const CartItems = () => {
  const { cart, RemoveFromCart, total } = useShop();
  return (
    <div className={styles.cardContainer}>
      <h3>Cart Products</h3>
      <hr className={styles.hr} />
      {cart.map((product) => {
        return (
          <div className={styles.card} key={product.id}>
            <div>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.proName}>{product.name}</span>
              <span className={styles.proPrice}>${product.price}</span>

              <button
                className={styles.remove}
                onClick={() => RemoveFromCart(product.id)}
              >
                ❌
              </button>
            </div>
          </div>
        );
      })}
      <hr className={styles.hr} />
      <div className={styles.total}>Total Price: ${total}</div>
    </div>
  );
};
export default CartItems;
