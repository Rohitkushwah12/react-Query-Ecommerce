import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAuthentication = (props) => {
  const navigate = useNavigate();
  const userLogin = localStorage.getItem("userAuth");

  useEffect(() => {
    if (!userLogin) {
      navigate("/login");
    } else {
      if (props.component.name === "Login") {
        navigate("/");
      }
    }
  }, []);

  return <props.component />;
};

export default UserAuthentication;
