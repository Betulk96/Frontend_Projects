"use client";
import PageHeader from "@/components/common/page-header";
import Spacer from "@/components/common/spacer";
import LoginForm from "@/components/login/login-form";
import React from "react";


const LoginPage = () => {
 

  return (
    <>
      <Spacer height={30} />     
      <LoginForm />
      <Spacer />
    </>
  );
};

export default LoginPage;
