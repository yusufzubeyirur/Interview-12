import React, { useState } from "react";
import "./styles.css";

const INITIAL_LIST = [
  { name: "Domates", value: 55.0 },
  { name: "Marul", value: 25.5 },
  { name: "Ekmek", value: 10.99 },
];

function App() {
  return <ItemValueList />;
}

const ItemValueList = () => {
  const [products, setProducts] = useState(INITIAL_LIST);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const addProduct = () => {
    if (name && value) {
      const numericValue = parseFloat(value);
      if (
        numericValue >= 0 &&
        !isNaN(numericValue) &&
        (value.split(".")[1]?.length ?? 0) <= 2
      ) {
        setProducts([...products, { name, value: numericValue }]);
        setName("");
        setValue("");
        setError("");
      } else {
        setError(
          "Lütfen geçerli bir değer gir. Fiyat sıfırdan büyük olmalı ve en fazla iki ondalıklı basamağa sahip olmalı."
        );
      }
    } else {
      setError("Lütfen ürün adı ve değeri gir.");
    }
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ürün İsmi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={addProduct}>Gönder</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="product-list">
        {products.map((item, index) => (
          <div key={index} className="product-item">
            <span className="product-name">{item.name}</span>
            <span className="product-price">{item.value.toFixed(2)} TL</span>
            <button
              onClick={() => removeProduct(index)}
              className="remove-button"
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
