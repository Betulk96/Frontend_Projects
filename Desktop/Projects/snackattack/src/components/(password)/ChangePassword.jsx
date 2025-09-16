"use client";
import SubmitButton from "@/components/common/form-fields/submit-button";
import Link from "next/link";
import React from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const ChangePassword = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col lg={6}>
          <FloatingLabel
            controlId="password"
            label={t("changePassword.currentPassword")}
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>

          <FloatingLabel
            controlId="password"
            label={t("changePassword.newPassword")}
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label={t("changePassword.confirmPassword")}
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Confirm New Password" />
          </FloatingLabel>

          <Link href="/">
            <SubmitButton className="w-100"/>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
