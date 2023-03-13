import { ObjectId } from "mongodb";
import { Schema, model, Document } from "mongoose";
import { IItem } from "../types";

const itemSchema = new Schema({
	user: {
		type: ObjectId,
		ref: "users",
	},
	name: String,
	start_price: String,
	current_price: String,
    time: String,
	date: {
		type: Date,
		default: Date.now(),
	},
});

export interface ItemDocument extends Document, IItem {}
export default model<ItemDocument>("Item", itemSchema);
