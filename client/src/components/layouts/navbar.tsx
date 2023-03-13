import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store/configureStore";
import { logout } from "../../store/actions/auth";
import { Avatar, Space, MenuProps, Dropdown } from 'antd';
import { UserType } from "../../global.types";

function Navbar({ logout, isAuthenticated, user }: NavbarProps) {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Link to="/create-item">Create New Item</Link>
			),
		},
		{
			key: '2',
			label: (
				<Link to="/deposit">Deposit</Link>
			),
		},
		{
			key: '3',
			label: (
				<a onClick={logout}>Logout</a>
			),
		},
	];
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link to="/" className="navbar-brand">
				{isAuthenticated && user ? user.email : "20230313"}
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					{!isAuthenticated ? (
						<>
							<li className="nav-item mx-2">
								<Link to="/login">Login</Link>
							</li>
							<li className="nav-item mx-2">
								<Link to="/register">Sign Up</Link>
							</li>
						</>
					) : (
						<>

							<Dropdown menu={{ items }}>
								<a onClick={(e) => e.preventDefault()}>
									<p className="navbar-brand">Balance: {user ? user.deposit : " NULL"}</p>
								
								</a>
							</Dropdown>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

const mapStateToProps = (state: AppState) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user,
	};
}

export default connect(mapStateToProps, { logout })(Navbar);

interface NavbarProps {
	isAuthenticated: boolean;
	logout: VoidFunction;
	user: UserType | null;
}
