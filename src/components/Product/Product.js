import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";

import "./Product.scss";
import { addProductToCart } from "../../redux/actions";

const Product = (props) => {
  const dispatch = useDispatch();

  const { title, price, image, category, id, rating } = props.product;

  return (
    <div className="card product">
      <Link to={`/products/${id}`} className="product__link">
        <img className="card-img-top product__img" src={image} alt={title} />
      </Link>
      <div className="card-body product__text">
        <h4 className="card-title product__title">
          <Link to={`/products/${id}`}>{title}</Link>
        </h4>
        <h5 className="product__price">{price} EUR</h5>
        <p className="card-text product__category mb-0">{category}</p>
        <ReactStars
          count={5}
          value={+rating.rate}
          size={24}
          activeColor="#ffd700"
          edit={false}
        />
        <p className="card-text">
          {+rating.count < 2
            ? `(${rating.count}) rating`
            : `(${rating.count}) ratings`}
        </p>
        <button
          onClick={() => {
            dispatch(addProductToCart({ ...props.product }));
          }}
          className="btn btn-info product__add-to-cart"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
