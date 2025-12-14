import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./CartPayment.module.css";
import useShop from "../../ShopContext";
import { toast } from "react-hot-toast";

const CartPayment = () => {
  const { total } = useShop();
  const numberInputRef = useRef();
  const [phone, setPhone] = useState("");
  const [focused, setFocused] = useState(false);
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
          payerInfo: { accountNo: phone },
          transactionInfo: {
            referenceId: "12334",
            invoiceId: "7896504",
            amount: total,
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
      console.log("Phone:", phone);
      console.log("Response:", data);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div className={styles.payment}>
      <h2>Payment</h2>
      <div className={styles.paymentInfo}>
        <div className={styles.methods}>
          {["ZAAD", "SAHAL", "EVC Plus"].map((method) => (
            <button
              key={method}
              className={styles.Button}
              onClick={handleFocus}
            >
              {method}
            </button>
          ))}
        </div>
        {focused && <span className={styles.warning}>Enter Your Number!</span>}
        <input
          type="tel"
          placeholder="063 xxx xxxx"
          value={phone}
          className={styles.Input}
          onChange={(e) => setPhone(e.target.value)}
          ref={numberInputRef}
        />
        <button
          className={styles.proceedButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default CartPayment;
