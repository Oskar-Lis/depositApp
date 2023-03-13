import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/actions/auth";
import { ILoginParams } from "../../global.types";
import { Modal } from 'antd';


interface LoginProps {
	login: (loginParams: ILoginParams) => void;
}

function Login({ login }: LoginProps) {
	
	const [ loginData, setLoginData] = useState<ILoginParams>({
		email: "",
		password: "" 
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginData({
			...loginData,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		login(loginData);
	};

	return (
		<Modal 
			open={true} 
			footer = {null} 
			centered 
			width = {400}
			closable = {false}
		>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 my-3 justify-content-center text-justify">
						<h1 className="text-secondary display-4 mb-4 text-justify">
							Login
						</h1>
						<form className="form" onSubmit={onSubmit}>
							<div className="form-group">
								<label>Email</label> <br />
								<input
									className="form-control"
									type="email"
									placeholder="Email Address"
									name="email"
									onChange={onChange}
									value={loginData.email}
								/>
							</div>
							<div className="form-group">
								<label>Password</label> <br />
								<input
									type="password"
									placeholder="Password"
									name="password"
									minLength={6}
									onChange={onChange}
									value={loginData.password}
									className="form-control"
								/>
							</div>
							<div className="row justify-content-center">
								<button type = "submit"  className="btn-secondary">
									Login
								</button>
							</div>
							<div className="mx-1 row justify-content-center">
								<p className="ml-3 my-2">
									<Link to="/register">Register</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default connect(null, { login })(Login);


