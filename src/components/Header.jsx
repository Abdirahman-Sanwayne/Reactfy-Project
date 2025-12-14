import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";
import useShop from "../ShopContext";

const Header = () => {
  const { cart } = useShop();
  const cartTotal = cart.reduce((total, item) => total + 1, 0);
  const admin = true;

  // State for mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link to={admin ? "/dashboard" : "/"} className={styles.logo}>
        REACTFY
      </Link>

      {/* Hamburger toggle */}
      <div
        className={`${styles.menuToggle} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Tabs */}
      <ul className={`${styles.tabs} ${menuOpen ? styles.show : ""}`}>
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

      {/* Cart Count */}
      <Link to="/cart" className={styles.cartWrapper}>
        {cartTotal > 0 && <span className={styles.cartCount}>{cartTotal}</span>}
      </Link>
    </header>
  );
};

export default Header;
