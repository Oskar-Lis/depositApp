import { Router } from "express";
import auth from "../middleware/auth";
import { check } from "express-validator";

import createItem from "../controllers/items/createItem";
import getAllItems from "../controllers/items/getAllItems";
import updateItem from "../controllers/items/updateItem";

const router = Router();

// @route    POST api/item/create
// @access   Private
// @desc     create item
router.post(
  "/create",
  auth,
  [check("name", "item is empty").notEmpty({ ignore_whitespace: true })],
  createItem
);

// @route    GET api/item/all
// @access   Private
// @desc     get all items
router.get("/all", auth, getAllItems);
router.post("/update", updateItem);
export default router;
