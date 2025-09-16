"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const UnAuthorized = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="row g-5 g-sm-0 align-items-center">
        <div className="col-sm-6">
          <Image
            src="/images/errors/error.png"
            className="img-fluid"
            width="500"
            height={500}
            alt="Unauthorized"
          />
        </div>
        <div className="col-sm-6 text-center text-sm-start">
          <h2>{t("error.unauthorized")}</h2>
          <p>{t("error.noAccess")}</p>
          <button className="btn btn-primary">{t("error.logout")}</button>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
