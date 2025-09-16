"use client";
import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import ReactInputMask from "react-input-mask-next";
import { useTranslation } from "react-i18next";
const MaskedInput = ({ className, label, error, ...rest }) => {
  const {t} = useTranslation();
  return (
    <>
      <FloatingLabel
        className={className}
        controlId={rest.name}
        label={t("dashboardAdmin.phoneNumber")}
      >
        <Form.Control
          {...rest}
          className="form-control"
          isInvalid={!!error}
          as={ReactInputMask}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </FloatingLabel>
    </>
  );
};

export default MaskedInput;
