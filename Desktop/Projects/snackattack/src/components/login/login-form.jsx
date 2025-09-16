"use client";
import React from "react";
import { Alert, Card, Col, Container, Form, Row } from "react-bootstrap";
import RegisterForm from "../register/register-form";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";



const LoginForm = () => {



  return (
    <Container>
      <Row className="mb-5 flex justify-center">
        <Col md={8} lg={6}>
          <Card>
            Login Form
          </Card>
        </Col>

      </Row>
      <Row className="flex justify-center"> 
        <Col>
           <Link href="/register" className="flex items-center justify-center bg-color1 text-color4 disabled rounded px-4 py-2  ">
          <FaRegUserCircle
            style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
          />
          Create Account
        </Link>
        </Col>
       
      </Row>

    </Container>
  );
};

export default LoginForm;
