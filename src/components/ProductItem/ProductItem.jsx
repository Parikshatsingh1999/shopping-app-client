import "./ProductItem.css";
import { useEffect, useState } from "react";
import { FetchBuilder } from "../../services/FetchBuidler";
import { useParams } from "react-router-dom";
import image from "../../assets/product-image.png";

export const ProductItem = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const path = `products/${id}`;
      FetchBuilder(path).then((res) => {
        if (!res.error) {
          setProduct(res);
        }
      });
    }
  }, [id]);

  return (
    <div>
      {!product && <div> Product Not Found </div>}
      {!!product && (
        <div className="productItem">
          <div className="product-wrapper">
            <div className="image-container">
              <img src={image} alt="product-featured" />
            </div>
            <div className="product-details">
              <h4 className="heading"> {product.title} </h4>
              <p>
                {product.currency} {product.price}{" "}
              </p>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
