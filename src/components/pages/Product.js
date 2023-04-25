import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { singleProductUrl } from "../../utils/apiUrl";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  const fetchProduct = () => {
    return axios.get(`${singleProductUrl}/${id}`).then((res) => res.data);
  };

  const { data, error, isSuccess, isPaused, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    retry: false,
  });

  console.log(data);
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
    <div>
      {isSuccess &&
        data.images.map((image) => {
          return (
            <div>
              <img src={image} alt="" />
            </div>
          );
        })}
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default Product;
