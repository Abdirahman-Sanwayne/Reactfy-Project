import { useState } from "react";
import styles from "./HandleProduct.module.css";
import useShop from "../../ShopContext";

const HandleProducts = () => {
  const { AddProduct, total } = useShop();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const handleSubmission = (event) => {
    event.preventDefault();

    if (name && price && image) {
      const read = new FileReader();
      read.onloadend = () => {
        const newPro = {
          id: Date.now(),
          name,
          description,
          category,
          price: Number(price),
          image: read.result,
        };
        AddProduct(newPro);
      };
      read.readAsDataURL(image);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Create Products</h3>
      <form onSubmit={handleSubmission} className={styles.form}>
        <input
          type="text"
          placeholder="Enter the product name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the product description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          defaultValue=""
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          <option select="" hidden></option>
          <option value="Pizza">Pizza</option>
          <option value="Meat">Meat</option>
          <option value="Fruit">Fruit</option>
          <option value="Sweets">Sweets</option>
          <option value="luncch">Meat and rice</option>
        </select>

        <input
          type="number"
          placeholder="Enter the product price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className={styles.createButton}>
          <button type="submit">Create Product</button>
        </div>
      </form>
      {console.log(total)}
    </div>
  );
};
export default HandleProducts;
