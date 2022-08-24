import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import Pagination from "../../components/Pagination/Pagination";
import { fetchProducts } from "../../redux/actions";
import "./Home.scss";
const Home = () => {
  const [gridView, setGridView] = useState(true);
  const [colValue, setColValue] = useState("col-lg-4 col-md-6");
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesToShow, setPagesToShow] = useState(5);
  const [filterValue, setFilterValue] = useState("");

  const productsFilter = (arr, filterValue) => {
    if (!filterValue) return arr;
    let value = filterValue.toLowerCase();
    return arr.filter(
      (product) =>
        product.title.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );
  };

  const products = useSelector((state) =>
    productsFilter(state.shop.products, filterValue)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const paginationPipe = (state, args) => {
    if (!args || !args.perPage || !args.currentPage) {
      return state;
    }
    const location = args.perPage * (args.currentPage - 1) || 0;
    return state.slice(location, location + args.perPage);
  };

  const onPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const goPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <React.Fragment>
      <div className="container" style={{ paddingTop: "6rem" }}>
        <div className="col-12">
          <div className="row mb-3">
            <div className="col-12">
              <div className="card ">
                <div className="card-header d-flex justify-content-end">
                  <span className="mr-3">Change Layout: </span>
                  <div className="grid mr-3">
                    <i
                      className={`fa fa-th-large ${gridView ? "selected" : ""}`}
                      onClick={() => {
                        setColValue("col-lg-4 col-md-6");
                        setGridView(true);
                      }}
                    />
                  </div>
                  <div className="list">
                    <i
                      className={`fa fa-list ${!gridView ? "selected" : ""}`}
                      onClick={() => {
                        setColValue("col-12");
                        setGridView(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="input-group mx-auto">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-search"></i>
                </span>
              </div>
              <input
                type="search"
                className="form-control"
                placeholder="Serach"
                aria-label="Serach"
                aria-describedby="Serach"
                autoComplete="off"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            {paginationPipe(products, { perPage, currentPage }).map(
              (product) => {
                return (
                  <div
                    className={`${colValue} ${!gridView ? "list" : ""} mb-4`}
                    key={product.id}
                  >
                    <Product product={product} />
                  </div>
                );
              }
            )}
          </div>
          <div className="d-flex justify-content-center">
            <Pagination
              totalItemsCount={products.length}
              currentPage={currentPage}
              perPage={perPage}
              pagestoShow={pagesToShow}
              onGoPage={goPage}
              onPrevPage={onPrev}
              onNextPage={onNext}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
