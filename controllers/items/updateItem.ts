import Item, { ItemDocument } from "../../models/item";

export default async (req, res) => {
	try {
	
		await Item.findById(req.body._id).updateOne(req.body);
		const items: ItemDocument[] = await Item.find();
		res.status(200).json(items);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
