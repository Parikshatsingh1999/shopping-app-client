import "./collectionItem.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createRequest } from "../../services/FetchBuidler";
import { ProductCard } from "../../snippets/ProductCard/ProductCard";

export const CollectionItem = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    if (id) {
      const path = `collections/${id}`;
      createRequest.fetch(path).then((res) => {
        if (!res.error) {
          setCollection(res);
        }
      });
    }
  }, [id]);

  return (
    <>
      {!!collection && (
        <div>
          <div>
            <h3 className="heading"> {collection.title} </h3>
            {!collection.products?.length && <p>Sorry, No Products Found </p>}
            {!!collection.products?.length && (
              <div className="product-list">
                {collection.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
