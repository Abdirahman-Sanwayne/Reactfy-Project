import useShop from "../ShopContext";
import styles from "./products.module.css";

const Products = () => {
  const { products, cart, AddToCart, RemoveFromCart } = useShop();
  const handleCart = (product) => {
    if (cart.includes(product)) {
      RemoveFromCart(product.id);
    } else {
      AddToCart(product);
    }
  };

  return (
    <div className={styles.cardContainer}>
      {products.map((product) => {
        return (
          <div
            className={styles.card}
            key={product.id}
            style={{
              background: `url(${product.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className={styles.cardInfo}>
              <span>{product.name}</span>
              <span>${product.price}</span>
            </div>
            <button
              className={
                cart.some((cartItem) => cartItem.id === product.id)
                  ? styles.remove
                  : styles.add
              }
              onClick={() => handleCart(product)}
            >
              {cart.some((cartItem) => cartItem.id === product.id) ? "-" : "+"}
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Products;
