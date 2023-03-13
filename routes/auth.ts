import { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/auth";
import authUser from "../controllers/authentication/authUser";
import login from "../controllers/authentication/login";
import register from "../controllers/authentication/register";
import createDeposit from '../controllers/authentication/createDeposit'
const router = Router();

// @route    GET api/auth
// @access   Public
// @desc     receive a user object if a jwt exists
router.get("/", auth, authUser);

// @route    POST api/auth/signup
// @access   Public
// @desc     signup users
router.post(
  "/register",
  [
    check("email", "please provide a valid email").isEmail(),
    check("password", "password must be between 6 an 18 characters").isLength({
      min: 6,
      max: 18,
    }),
  ],
  register
);

// @route    POST api/auth/login
// @access   Public
// @desc     login
router.post(
  "/login",
  [
    check("email", "please provide a valid email").isEmail(),
    check("password", "please enter your password").exists({
      checkFalsy: true,
      checkNull: true,
    }),
  ],
  login
);

// @route    POST api/auth/create-deposit
// @access   Public
// @desc     login
router.post(
  "/create-deposit",
  auth,
  [check("deposit", "item is empty").notEmpty({ ignore_whitespace: true })],
  createDeposit
);

export default router;
