import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <Link
      className="product-link btn-link product-card"
      to={`/products/${product.id}`}
    >
      {!!product.image && <img src={product.image} alt="product img"></img>}
      <p> {product?.id} </p>
      <div>
        <p> {product.title} </p>
      </div>
      {!!product.price && (
        <div>
          <p>
            {product.currency || "Rs."} {product.price}
          </p>
        </div>
      )}
    </Link>
  );
};
