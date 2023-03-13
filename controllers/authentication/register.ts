import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User, { UserDocument } from "../../models/user";

export default async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { username, email, password, deposit } = req.body;

	try {
		// check if email exist
		const existingUser: UserDocument = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				errors: [
					{
						msg: "email already exists",
						param: "email",
						location: "body",
					},
				],
			});
		}

		//encrypting password
		const hashedPassword = await bcrypt.hash(password, 12);

		//saving user
		const user: UserDocument = new User({
			username, 
			email,
			password: hashedPassword,
			deposit,
		});
		await user.save();

		// jwt auth
		const payload = {
			user: user,
		};

		jwt.sign(
			payload,
			"token",
			{ expiresIn: "5 days"},
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
