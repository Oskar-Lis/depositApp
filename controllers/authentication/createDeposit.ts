import User, { UserDocument } from "../../models/user";
import { IUser } from "../../types";

export default async (req, res) => {
	try {
		const user: UserDocument = await User.findById(req.user._id);
        user.deposit = req.body.deposit;
        await user.save();
		res.status(200).json({
			_id: user._id,
			email: user.email,
			date: user.date,
			deposit: user.deposit,
		} as IUser);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};

