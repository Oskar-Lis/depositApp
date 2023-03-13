import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
	return (
		<section className="bg-dark container-fluid">
			<div className="row">
				<div
					className="col-12 d-flex flex-column justify-content-center align-items-center"
					style={{ height: "91.7vh" }}
				>
					<div className="row justify-content-center my-5 row flex-column justify-content-center">
						<h1 className="display-lg-4 display-md-3 display-1 text-light font-weight-bold text-center">
							REACT, NODE, TS
						</h1>
						<h4 className="px-2 lead text-light text-center">
							Frontend : React, Backend : Node, database : MongoDB
						</h4>
					</div>
					<div className="row justify-content-center my-2">
						<Link to="/login" className="btn btn-lg btn-secondary mx-2">
							Login
						</Link>
						<Link to="/register" className="btn btn-lg btn-primary mx-2">
							Sign Up
						</Link>
					</div>
					<div className="row my-5 py-3"></div>
				</div>
			</div>
		</section>
	);
}
