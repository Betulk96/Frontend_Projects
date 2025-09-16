"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import Search from './Search';
import { Col, Container, Row } from 'react-bootstrap';

const Banner = () => {
  const router = useRouter();
  return (
    <Container className="h-screen mx-auto">
      <Row className="w-full h-full d-flex justify-between items-center px-4">
        <Col className="d-flex justify-start">
          <Search />
        </Col>
        <Col className="d-flex justify-end gap-3">
          <a href="/link1" className="bg-color1 text-white py-2 px-4 rounded-md hover:bg-color2 transition duration-300">Category</a>
          <a href="/link2" className="bg-color1 text-white py-2 px-4 rounded-md hover:bg-color2 transition duration-300">All Product</a>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
