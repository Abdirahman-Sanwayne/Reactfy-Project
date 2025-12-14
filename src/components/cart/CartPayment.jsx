import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./CartPayment.module.css";
import useShop from "../../ShopContext";
import { toast } from "react-hot-toast";

const CartPayment = () => {
  const { total, cart } = useShop();
  const numberInputRef = useRef();
  const [phone, setPhone] = useState("");
  const [Focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFocus = () => {
    if (numberInputRef.current) {
      numberInputRef.current.focus();
      setFocused(true);
    }
  };
  useEffect(() => {
    setFocused(false);
  }, [phone]);

  const handleSubmit = () => {
    if (!phone) {
      setFocused(true);
      return toast.error("Please enter your phone number");
    }
    processPayment();
  };

  const processPayment = async () => {
    try {
      const paymentBody = {
        schemaVersion: "1.0",
        requestId: "10111331033",
        timestamp: Date.now(),
        channelName: "WEB",
        serviceName: "API_PURCHASE",
        serviceParams: {
          merchantUid: process.env.REACT_APP_MERCHANT_U_ID,
          apiUserId: process.env.REACT_APP_MERCHANT_API_USER_ID,
          apiKey: process.env.REACT_APP_MERCHANT_API_KEY,
          paymentMethod: "mwallet_account",
          payerInfo: {
            accountNo: phone,
          },
          transactionInfo: {
            referenceId: "12334",
            invoiceId: "7896504",
            amount: total,
            // currency: "ETB", // ebir
            currency: "USD",
            description: "Product details",
          },
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "https://api.waafipay.net/asm",
        paymentBody
      );
      setLoading(false);
      console.log("Number:- ", phone);
      console.log("Jawaab:- ", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.payment}>
      <h2>Payment</h2>
      <div className={styles.paymentInfo}>
        <button className={styles.Button} onClick={handleFocus}>
          ZAAD
        </button>
        <button className={styles.Button} onClick={handleFocus}>
          SAHAL
        </button>
        <button className={styles.Button} onClick={handleFocus}>
          EVC Plus
        </button>
        {Focused && (
          <span style={{ color: "red", marginLeft: "20px" }}>
            Enter Your Number!
          </span>
        )}
        <input
          type="text"
          placeholder="063 xxx xxxx"
          value={phone}
          className={styles.Input}
          onChange={(e) => setPhone(e.target.value)}
          ref={numberInputRef}
        />
        <button className={styles.proceedButton} onClick={handleSubmit}>
          {loading ? "Loading..." : "Proceed"}
        </button>
      </div>
    </div>
  );
};
export default CartPayment;
