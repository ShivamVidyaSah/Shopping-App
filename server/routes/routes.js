import express from "express";

import multer from "multer";
import fs from "fs";

const uploadDir = "uploads/";

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/") // Store images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
}); // or diskStorage

const upload = multer({ storage });


import {  getUserInfo, signUpUser, updateImg, userLogin } from "../controller/user-controller.js";
import { AddProduct, deleteProduct, getAllProducts } from "../controller/product-controller.js";
import { resetPassword, sendOTP, verifyOTP } from "../controller/password-controller.js";

const router = express.Router();

router.post('/signup', signUpUser);

router.post('/login', userLogin);

router.get('/getinfo', getUserInfo, );

router.post('/addproduct',upload.array('images',10), AddProduct);

router.patch('/updateinfo', upload.single("profileimage"), updateImg)

router.get('/getallproducts', getAllProducts);

router.delete('/deleteproduct/:id', deleteProduct);

router.post('/forgetpassword', sendOTP );

router.post('/verifyotp', verifyOTP);

router.put('/resetuserpassword', resetPassword)


export default router;

