const express=require('express');
const router=express.Router();
const formidable=require('express-formidable');
const {requiresignIn,isadmin}=require('../middleware/auth.middleware');
const {createproductController,getProductsController,getSingleProductController,getProductPhotoController,updateProductController,productCountController,productListController,deleteProductController,productFiltersController,searchProductController,realtedProductController,productCategoryController}=require('../controller/product.controller');
const { get } = require('mongoose');

router.post('/create_product',requiresignIn,isadmin,formidable(),createproductController);

//get all the products
router.get('/get_products',getProductsController);

//get the single product
router.get('/get_single_product/:slug',getSingleProductController);

//get the photo
router.get('/get_product_photo/:pid',getProductPhotoController);

//update product
router.put('/update_product/:pid',requiresignIn,isadmin,formidable(),updateProductController);

//delete product
router.delete('/delete_product/:pid',requiresignIn,isadmin,deleteProductController);

//filter product
router.post('/product_filters',productFiltersController);

//product_count
router.get('/product_count',productCountController)

//product_list
router.get('/product_list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController);

//similar product
router.get('/related-product/:pid/:cid', realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

module.exports=router;