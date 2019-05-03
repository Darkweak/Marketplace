import * as React from 'react';
import {
  Button
} from 'react-bootstrap';
import { Product } from "../Objects/Product";

interface ProductProps {
  product: Product
}

export const Item: React.FunctionComponent<ProductProps> = ({product}: ProductProps) => (
  <div className="card h-100">
      <div className={`position-relative d-flex${product.promotion && ' promoted-product'}`}>
          <img
              className="img-fluid w-100 img-fit"
              src={product.image && product.image.url}
              alt={product.image && product.image.name}/>
      </div>
      <div className="bg-primary text-center">
          <h5 className="card-title text-center m-0 py-4">
              <a className="text-white text-decoration-none" href={`/categories/${product.category.name}`}>
                {product.category.name}
              </a>
          </h5>
      </div>
      <h1 className={`card-text text-center p-2 ${product.promotion && 'promoted-price text-white'}`}>
          {product.promotion ? product.pricePromotion : product.price}€
      </h1>
      <div className="card-body">
        <h5 className="card-title text-center">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <div className="text-center">
          <Button>
            <i className="fas fa-cart-arrow-down"/> Ajouter au panier
          </Button>
        </div>
      </div>
  </div>
);
