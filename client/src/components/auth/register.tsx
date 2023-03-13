import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../store/actions/auth";
import { ISignupParams } from "../../global.types";
import { Button, Modal } from 'antd';

interface SignupProps {
	signup: (signupParams: ISignupParams) => void;
}

function Register({ signup }: SignupProps) {

	const [signupData, setSignupData] = useState<ISignupParams>({
		username : "",
		email: "",
		password: "",
		deposit: 0,
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSignupData({
			...signupData,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		signup(signupData);
	};

	return (
		<Modal
			open={true}
			footer={null}
			centered
			width={400}
			closable={false}
		>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 my-3">
						<h1 className="text-primary display-4  mb-4">
							Register
						</h1>
						<form className="form" onSubmit={onSubmit}>
							<div className="form-group">
								<label>Username</label> <br />
								<input
									type="username"
									required
									name="username"
									onChange={onChange}
									value={signupData.username}
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label>Email</label> <br />
								<input
									type="email"
									required
									name="email"
									onChange={onChange}
									value={signupData.email}
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input
									type="password"
									placeholder="Password"
									name="password"
									minLength={6}
									onChange={onChange}
									value={signupData.password}
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label>Deposit</label>
								<input
									type="deposit"
									placeholder="deposit"
									name="deposit"
									minLength={6}
									onChange={onChange}
									value={signupData.deposit}
									className="form-control"
								/>
							</div>
							<div className="row justify-content-center">
								<button type="submit" className="btn btn-primary">
									Register
								</button>
							</div>
							<div className="row justify-content-center">
								<p className="ml-3 my-2">
									<Link to="/login">Log In</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default connect(null, { signup })(Register);

