"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import SubmitButton from "../../common/form-fields/submit-button";
import { forgotPassword } from "@/services/user-service";
import { swAlert } from "@/helpers/swal";
import { useTranslation } from "react-i18next";
import Loading from "@/app/loading";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
   

    e.preventDefault();
    setLoading(true);
    try { 
      const response = await forgotPassword({ email });
      if (response.ok) {
        swAlert(`${t("alert.success")}`);
        router.push("/reset-password");
      } else {
        swAlert(`${t("alert.fail")}`);
      }
    } catch (error) {
      swAlert( `${t("alert.error")}`);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col lg={6}>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="email"
              label={t("login.email")}
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </FloatingLabel>

            <SubmitButton className="w-100" title={loading ? <Loading/> : "Send Reset Code"} disabled={loading} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
