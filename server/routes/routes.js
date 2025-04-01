import express from "express";

import multer from "multer";


const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage });


import { getUserInfo, signUpUser, userLogin } from "../controller/user-controller.js";
import { AddProduct, deleteProduct, getAllProducts } from "../controller/product-controller.js";

const router = express.Router();

router.post('/signup', signUpUser);

router.post('/login', userLogin);

router.get('/getinfo', getUserInfo, );

router.post('/addproduct',upload.array("images"), AddProduct);

router.get('/getallproducts', getAllProducts);

router.delete('/deleteproduct/:id', deleteProduct);


export default router;