




import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProductFilter.module.css";

const Product = ({ product }) => (
  <div className={styles.product}>
    <h3>{product.name}</h3>
    <p>Category: {product.category}</p>
  </div>
);

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};

const ProductFilter = ({ products }) => {
  const [category, setCategory] = useState("All");

  const handleFilterChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredProducts = category === "All" 
    ? products 
    : products.filter((product) => product.category === category);

  return (
    <div className={styles.container}>
      <h1>Product Filter</h1>
      <select onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Home Decor">Home Decor</option>
      </select>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <Product key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};

ProductFilter.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductFilter;
