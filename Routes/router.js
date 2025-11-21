 const express = require('express')
const userController=require('../Controller/userController')
const jwtmiddleware=require('../Middleware/jwtMiddleware')
const {addProduct,getProducts,deleteProduct} = require("../Controller/productController");




 const router=express.Router()
router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.post("/add", addProduct);
router.get("/all", getProducts);
router.delete("/delete/:id", deleteProduct);




 module.exports=router