import express from "express";
import { signUpUser, userLogin } from "../controller/user-controller.js";

const router = express.Router();

router.post('/signup', signUpUser);

router.post('/login', userLogin);


export default router;