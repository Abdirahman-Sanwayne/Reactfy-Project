import useShop from "../../ShopContext";
import styles from "./CartItems.module.css";

const CartItems = () => {
  const { cart, RemoveFromCart, total } = useShop();

  if (cart.length === 0) {
    return <p className={styles.empty}>No products in cart.</p>;
  }

  return (
    <div className={styles.cardContainer}>
      <h3>Cart Products</h3>
      <hr className={styles.hr} />
      {cart.map((product) => (
        <div className={styles.card} key={product.id}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
          <div className={styles.cardInfo}>
            <span className={styles.proName}>{product.name}</span>
            <span className={styles.proPrice}>${product.price}</span>
            <button
              className={styles.remove}
              onClick={() => RemoveFromCart(product.id)}
              aria-label={`Remove ${product.name}`}
            >
              ❌
            </button>
          </div>
        </div>
      ))}
      <hr className={styles.hr} />
      <div className={styles.total}>Total Price: ${total}</div>
    </div>
  );
};

export default CartItems;
