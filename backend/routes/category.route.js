const express=require('express');
const router=express.Router();
const {requiresignIn,isadmin}=require('../middleware/auth.middleware');
const {createCategoryController,updateCategoryController,getCategoryController,getSingleCategoryController,deleteCategoryController}=require('../controller/create.controller');

//pass data to the server
router.post('/create_category',requiresignIn, isadmin, createCategoryController);


//update the category 
router.put('/update_category/:id',requiresignIn, isadmin, updateCategoryController);

// get the category
router.get('/get_category', getCategoryController)


//get the single category wth slug
router.get('/get_single_category/:slug', getSingleCategoryController)

//delete the category wth id
router.delete('/delete_category/:id',requiresignIn, isadmin, deleteCategoryController);

module.exports=router;