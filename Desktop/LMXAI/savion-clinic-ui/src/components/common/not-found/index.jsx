"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "@/styles/index.scss";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="error-component w-100 h-100 d-flex justify-content-center align-items-center rounded-5" style={{backgroundColor: "linear-gradient(180deg, #FFFFFF 0%, rgba(227,224,35,0.1))",maxWidth:"660px"}}> 
      <div
        className="row g-5 g-sm-0 align-items-center rounded-5 overflow-hidden"
        style={{ maxWidth: "1250px" }}
      >
        <div className="text-center mb-sm-5 p-5 p-lg-0">
          <h1 style={{ fontSize: "260px", color: "#09A6F3" }}>404</h1>
          <p style={{ fontSize: "40px", color: "#09A6F3" }}
          className="error-text">
            Oops! Something wrong…{" "}
          </p>
          <p>
            {" "}
            The page you are looking for does not exist. It might have been
            moved or deleted.
          </p>
          <p>Thank you for your understanding.</p>
          <button
            className="btn p-2 fs-5 p-md-3"
            style={{ backgroundColor: "#09A6F3" }}
            onClick={() => router.push("/")}
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
