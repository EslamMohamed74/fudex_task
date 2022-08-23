import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Header.scss";
import CartDropdown from "../CartDropdown/CartDropdown";
const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <div className="container">
        <Navbar.Brand as={NavLink} to="/">
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <CartDropdown />
            <NavDropdown
              title={
                <div className="pull-left" style={{ width: "110px" }}>
                  <img
                    className="thumbnail-image"
                    src="https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"
                    alt="user pic"
                    width="30px"
                  />
                  User Name
                </div>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/">
                View / Edit profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
