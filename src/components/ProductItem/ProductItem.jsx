import "./ProductItem.css";
import { useEffect, useState, useRef } from "react";
import { createRequest } from "../../services/FetchBuidler";
import { useParams } from "react-router-dom";
import { alertMessage } from "../../helpers/alerts";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cartSlice";
import { Link } from "react-router-dom";

export const ProductItem = () => {
  const cart = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login);
  const { productId } = useParams();
  const dispath = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const quantityRef = useRef();

  useEffect(() => {
    if (productId) {
      const path = `products/${productId}`;
      createRequest.fetch(path).then((res) => {
        if (!res.error) {
          setProduct(res);
        } else if (res?.error) {
          alertMessage(
            res.error || `Something went wrong while getting product info`
          );
        }
        setLoading(false);
      });
    }
  }, [productId]);

  const addItem = (e) => {
    e.preventDefault();
    let quan = Number(quantityRef.current.value) || 1;
    quan = quan > 0 ? quan : 1;
    dispath(addItemToCart({ id: product.id, quantity: quan }));
  };

  return (
    <div>
      {!!loading && <div> Loading... </div>}
      {!loading && (
        <>
          {!product && <div> Product Not Found </div>}
          {!!product && (
            <div className="productItem">
              <div className="product-wrapper">
                <div className="image-container">
                  <img src={product.image} alt="product-featured" />
                </div>
                <div className="product-details">
                  <h4 className="heading"> {product.title} </h4>
                  <p>
                    {product.currency} {product.price}
                  </p>
                  <p>{product.description}</p>
                  <form onSubmit={addItem} disabled={cart.isUpdating}>
                    <div className="add-to-cart">
                      <div>
                        <input
                          type="number"
                          min={1}
                          defaultValue={1}
                          ref={quantityRef}
                          onChange={(e) =>
                            e.target.value <= 0 && (e.target.value = 1)
                          }
                        />
                      </div>
                      {!!login.isLoggedIn && (
                        <button disabled={cart.isUpdating} type="submit">
                          Add to cart
                        </button>
                      )}

                      {!login.isLoggedIn && (
                        <p>
                          Please <Link to="/login"> login</Link> to add this
                          item to cart
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
