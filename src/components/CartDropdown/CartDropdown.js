import React from "react";
import { useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import DropdownItem from "../../components/DropdownItem/DropdownItem";
const CartDropdown = () => {
  const cartLength = useSelector((state) =>
    state.shop.cart.reduce((count, curItem) => {
      return count + curItem.quantity;
    }, 0)
  );

  const cartItems = useSelector((state) => state.shop.cart);

  const cartItemCount = useSelector((state) =>
    state.shop.cart.reduce((count, curItem) => {
      return count + curItem.quantity;
    }, 0)
  );

  return (
    <NavDropdown
      className="CartDropdown"
      title={
        <div className="pull-left">
          <i className="fa fa-shopping-cart mr-2" aria-hidden="true" />
          Cart {cartLength ? `(${cartLength})` : ""}
        </div>
      }
      id="collasible-nav-dropdown"
    >
      <NavDropdown.ItemText>
        <div className="card shopping-cart">
          <div className="card-body">
            {cartItemCount ? (
              cartItems.map((cart) => <DropdownItem {...cart} key={cart.id} />)
            ) : (
              <h6 className="text-center">There is no product in your cart</h6>
            )}
            {cartItemCount ? (
              <div className="row">
                <Link
                  to="/cart"
                  className="btn  btn-outline-primary text-uppercase mx-auto my-2"
                >
                  Review order{" "}
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </NavDropdown.ItemText>
    </NavDropdown>
  );
};

export default CartDropdown;
