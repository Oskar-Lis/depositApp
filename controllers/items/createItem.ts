import { validationResult } from "express-validator";
import { Document } from "mongoose";

import User, { UserDocument } from "../../models/user";
import Item, { ItemDocument } from "../../models/item";
import { IItem } from "../../types";

export default async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user: UserDocument = await User.findById(req.user._id).select(
			"email"
		);

		const newItem: IItem = {
			user: req.user._id,
			name: req.body.name,
			start_price: req.body.start_price,
			time: req.body.time,
		};

		const newItemDoc: ItemDocument = new Item(newItem);
		await newItemDoc.save();

		res.status(201).json(newItemDoc);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
