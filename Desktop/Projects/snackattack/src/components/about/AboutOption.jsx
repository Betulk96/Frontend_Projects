"use client";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import "./about-option.scss";
import { MdOutlineRealEstateAgent, MdOutlineWorkOutline } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";

import { useTranslation } from "react-i18next";
const AboutOption = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="about-mission-bottom">
        <div className="about-content-bottom">
          <h2>{t("option.mainTitle")}</h2>
          <div className="about-list-bottom">
            <div className="about-list-item-bottom">
              <span className="span">
                <MdOutlineRealEstateAgent style={{ fontSize: "2rem" }} />
              </span>
              <div className="about-list-item-text">
                <h4>{t("option.title1")}</h4>
                <p>{t("option.desc")}</p>
              </div>
            </div>
            <div className="about-list-item-bottom">
              <span className="span">
                <FaRegBuilding style={{ fontSize: "2rem" }} />
              </span>
              <div className="about-list-item-text">
                <h4>{t("option.title2")}</h4>
                <p>{t("option.desc")}</p>
              </div>
            </div>
            <div className="about-list-item-bottom">
              <span className="span">
                <MdOutlineWorkOutline style={{ fontSize: "2rem" }} />
              </span>
              <div className="about-list-item-text">
                <h4>{t("option.title3")}</h4>
                <p>{t("option.desc")}</p>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/images/about/about-two.jpg"
          alt="mission"
          width={550}
          height={500}
          className="about-img-bottom"
        />
      </div>
    </Container>
  );
};

export default AboutOption;
