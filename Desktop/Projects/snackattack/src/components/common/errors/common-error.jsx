"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const CommonError = ({ error, reset }) => {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<Container>
			<Row className="g-5 g-sm-0 align-items-center ">
				<Col sm={6}>
					<Image
						src="/images/errors/error.png"
						className="img-fluid"
						width={500}
						height={500}
						alt="Not found"
					/>
				</Col>
				<Col sm={6} className="text-center text-sm-start">
					<h2>Error</h2>
					<p>
						Unexpected error.
					</p>
					<button className="btn btn-primary" onClick={() => reset()}>
						Try again
					</button>
				</Col>
			</Row>
		</Container>
	);
};

export default CommonError;
