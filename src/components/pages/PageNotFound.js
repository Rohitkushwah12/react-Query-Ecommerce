import React from "react";

const PageNotFound = () => {
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{
          height: "600px",
        }}
        src={require("../asset/pageNotFound.jpg")}
        alt=""
      />
    </div>
  );
};

export default PageNotFound;
