import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const LIMIT = 15;
const fetchProducts = (page) => {
  return axios
    .get(
      `https://dummyjson.com/products?limit=${LIMIT}&skip=${(page - 1) * LIMIT}`
    )
    .then((res) => res.data);
};

const Products = () => {
  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
    isPaused,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),
    getNextPageParam: (lastpage, pages) => {
      return lastpage.products.length === LIMIT ? pages.length + 1 : undefined;
    },
    refetchInterval: 1,
    refetchOnWindowFocus: true,
    retry: 5,
  });

  if (isLoading) return "Loading...";
  if (error)
    return (
      <h4 style={{ textAlign: "center" }}>
        An error has occurred : {error.message}
      </h4>
    );

  if (isPaused)
    return <h2 style={{ textAlign: "center" }}>No Internet Connection</h2>;

  return (
    <>
      <div className="productsWrapper">
        {isSuccess &&
          data?.pages.map((page) => {
            return page.products.map((product) => {
              return (
                <div className="card" key={product.id}>
                  <img src={product.images[0]} alt="" />
                  <h4>{product.title}</h4>
                  <h5>Price : {product.price}$</h5>
                  <h6>{product.discountPercentage}% off</h6>
                  <Link className="navLink" to={`/products/${product.id}`}>
                    View Details
                  </Link>
                </div>
              );
            });
          })}
      </div>
      <button
        type="button"
        onClick={() => fetchNextPage()}
        className="btn"
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More...
      </button>
    </>
  );
};

export default Products;
