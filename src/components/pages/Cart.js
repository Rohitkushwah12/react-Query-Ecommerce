import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { userCartUrl } from "../../utils/apiUrl";

const Cart = () => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));

  const fetchCart = () => {
    return axios.get(`${userCartUrl}/${userAuth.id}`).then((res) => res.data);
  };

  const { data, error, isSuccess, isPaused, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    refetchInterval: 100000,
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
  return <div></div>;
};

export default Cart;
