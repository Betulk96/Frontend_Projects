"use client";
import AboutMainPage from "@/components/about/AboutMainPage";
import PageHeader from "@/components/common/page-header";
import Spacer from "@/components/common/spacer";
import ScrollToTopButton from "@/components/scroll-to-top/scroll-to-top-button";
import React from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {

  const { t } = useTranslation();

  return (
    <>
      <Spacer height={30} />
      <PageHeader>{t("pageHeader.about")}</PageHeader>
      <Spacer height={30} />
      <AboutMainPage />
      <ScrollToTopButton />
    </>
  );
};

export default AboutPage;
