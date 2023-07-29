import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <Link
      className="product-link btn-link product-card"
      to={`/products/${product._id}`}
    >
      {" "}
      <p> {product?.id} </p>
      <div>
        <p> {product.title} </p>
      </div>
    </Link>
  );
};
