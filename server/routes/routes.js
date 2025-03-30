import express from "express";
import { getUserInfo, signUpUser, userLogin } from "../controller/user-controller.js";
import { AddProduct, getAllProducts } from "../controller/product-controller.js";

const router = express.Router();

router.post('/signup', signUpUser);

router.post('/login', userLogin);

router.get('/getinfo', getUserInfo, );

router.post('/addproduct', AddProduct);

router.get('/getallproducts', getAllProducts)


export default router;