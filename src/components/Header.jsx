import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import useShop from "../ShopContext";
const Header = () => {
  const { cart } = useShop();
  const cartTotal = cart.reduce((total, item) => total + 1, 0);
  const admin = true;
  return (
    <div className={styles.header}>
      <Link to={admin ? "/dashboard" : "/"} className={styles.logo}>
        REACTFY
      </Link>
      <ul className={styles.tabs}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contacts">Contact</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
      <Link to="/cart" className={styles.cartCount}>
        {cartTotal > 0 && <span className={styles.cartCount}>{cartTotal}</span>}
      </Link>
    </div>
  );
};

export default Header;
