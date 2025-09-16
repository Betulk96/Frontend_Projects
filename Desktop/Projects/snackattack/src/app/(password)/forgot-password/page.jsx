"use client"
import React from "react";
import ForgotPassword from "@/components/(password)/forgot-password/ForgotPassword";
import PageHeader from "@/components/common/page-header";
import Spacer from "@/components/common/spacer";
import { useTranslation } from "react-i18next";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Spacer height={30} />
      <PageHeader>{t("pageHeader.forgotPassword")}</PageHeader>
      <Spacer height={30} />
      <ForgotPassword />
      <Spacer />
    </>
  );
};

export default ForgotPasswordPage;