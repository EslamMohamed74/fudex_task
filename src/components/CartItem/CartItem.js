import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./CartItem.scss";
import {
  decrementCartQuantity,
  incrementCartQuantity,
  removeProductToCart,
} from "../../redux/actions";

const CartItem = ({
  title,
  category,
  price,
  description,
  quantity,
  id,
  image,
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(removeProductToCart(id));
  };

  const incrementOrDecrement = (e, type) => {
    const value = itemQuantity;

    if (type === "inc") {
      setItemQuantity(itemQuantity + 1);
      dispatch(incrementCartQuantity(id));
    }

    if (type === "desc" && value > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(decrementCartQuantity(id));
    }
  };

  return (
    <div className="row align-items-center mb-3">
      <div className="col-12 col-sm-12 col-md-2 text-center">
        <img
          className="img-responsive"
          src={image}
          style={{ height: "60%", width: "60%" }}
          alt={description}
        />
      </div>
      <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
        <h4 className="product-name">
          <strong>{title}</strong>
        </h4>
        <p>{category}</p>
        <h4>
          <small className="product-description">{description}</small>
        </h4>
      </div>
      <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row product-quantity-container align-items-center">
        <div
          className="col-6 col-sm-6 col-md-6 text-md-right"
          style={{ paddingTop: "5px" }}
        >
          <h6>
            <strong>{price} EUR</strong>
          </h6>
        </div>
        <div className="col-4 col-sm-4 col-md-4">
          <div className="quantity">
            <input
              onClick={(e) => {
                incrementOrDecrement(e, "inc");
              }}
              type="button"
              value="+"
              className="plus"
            />
            <input
              type="number"
              step="1"
              max="10"
              min="1"
              value={itemQuantity}
              title="Qty"
              className="qty"
              size="4"
              disabled
            />
            <input
              onClick={(e) => {
                incrementOrDecrement(e, "desc");
              }}
              type="button"
              value="-"
              className="minus"
            />
          </div>
        </div>
        <div className="col-2 col-sm-2 col-md-2 text-right">
          <button
            onClick={removeItem}
            type="button"
            className="btn btn-outline-danger btn-xs"
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
