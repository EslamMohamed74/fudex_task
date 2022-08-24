import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigureStore } from "./redux";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import OrderNowForm from "./components/OrderNowForm/OrderNowForm";

const store = ConfigureStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/products/:id" element={<ProductDetail />} />
            <Route exact path="/cart" element={<ShoppingCart />} />
            <Route exact path={"/order"} element={<OrderNowForm />} />
          </Routes>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
