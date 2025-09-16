"use client";
import React from "react";
import { Spinner } from "react-bootstrap";
import { Hourglass } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Hourglass
        visible={true}
        height="60"
        width="60"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={[" #088395", " #088395"]}
      />
    </div>
  );
};

export default Loading;