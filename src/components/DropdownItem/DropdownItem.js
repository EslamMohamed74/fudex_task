import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./DropdownItem.scss";
import {
  decrementCartQuantity,
  incrementCartQuantity,
  removeProductToCart,
} from "../../redux/actions";

const DropdownItem = ({ title, quantity, id, image }) => {
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
    <div className="row item align-items-center mb-3">
      <div className="col-6 px-0 col-md-4 text-center">
        <img
          className="img-responsive"
          src={image}
          style={{ height: "60%", width: "60%" }}
          alt={title}
        />
      </div>
      <div className="col-6 text-sm-center text-md-left col-md-3">
        <h6 className="product-name">
          <strong>{title}</strong>
        </h6>
      </div>
      <div className="col-12 text-sm-center col-md-5 col-lg-6 text-md-right row product-quantity-container justify-content-center align-items-center">
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
        <button
          onClick={removeItem}
          type="button"
          className="btn btn-outline-danger btn-xs"
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    </div>
  );
};

export default DropdownItem;
