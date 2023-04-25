import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { userProfileUrl } from "../../utils/apiUrl";

const Profile = () => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));

  const fetchUser = () => {
    return axios
      .get(`${userProfileUrl}/${userAuth.id}`)
      .then((res) => res.data);
  };

  const { data, error, isSuccess, isPaused, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    refetchInterval: 100000,
    refetchOnWindowFocus: true,
    retry: false,
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
    <div>
      <img src={data.image} alt="" />
      <h1>
        Name :
        {` ${data.firstName}
        ${data.lastName}`}
      </h1>
    </div>
  );
};

export default Profile;
