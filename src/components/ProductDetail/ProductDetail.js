import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addProductToCart } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";

const ProductDetail = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.shop.products.find((product) => product.id === +params.id)
  );
  const onCart = () => {
    dispatch(addProductToCart(product));
  };
  return (
    <div className="container" style={{ padding: "6rem 0" }}>
      <div className="card">
        <div className="row">
          <aside className="col-sm-5 border-right">
            <article className="gallery-wrap">
              <div className="img-big-wrap">
                <div style={{ padding: "2rem" }}>
                  <img
                    src={product.image}
                    style={{ width: "100%", height: "100%" }}
                    alt={product.title}
                  />
                </div>
              </div>
            </article>
          </aside>
          <aside className="col-sm-7">
            <article className="card-body p-5">
              <h3 className="title mb-3">{product.title}</h3>

              <p className="price-detail-wrap">
                <span className="price h3 text-warning">
                  <span className="num">{product.price} EUR</span>
                </span>
              </p>
              <dl>
                <dt>Description</dt>
                <dd>
                  <p>{product.description}</p>
                </dd>
              </dl>
              <dl>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </dl>
              <dl>
                <dt>rating</dt>
                <dd>
                  <ReactStars
                    count={5}
                    value={+product.rating.rate}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                </dd>
                <dd>
                  {+product.rating.count < 2
                    ? `(${product.rating.count}) rating`
                    : `(${product.rating.count}) ratings`}
                </dd>
              </dl>
              <hr />
              <button
                onClick={onCart}
                className="btn btn-lg btn-outline-primary text-uppercase"
              >
                <i className="fa fa-shopping-cart" /> Add to cart
              </button>
            </article>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
