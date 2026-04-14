const categorymodel = require("../models/categorymodel.js");
const slugify = require("slugify");


async function createCategoryController(req,res){
  try {
    const {name}=req.body;
    if(!name){
      return res.status(401).send({
        message:"Name is required"
      })
    }
    const exitingname=await categorymodel.findOne({name});
    if(exitingname){
      return res.status(401).send({
        message:"Category already exists"
      })
    }
    const category = await new categorymodel({ name, slug: slugify(name) }).save();
    return res.status(201).send({
      success:true,
      message:"Category created successfully",
      category
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }

}

async function updateCategoryController(req,res){
  try {
    const {name}=req.body;
    const {id}=req.params;
    const category = await categorymodel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    if(!category){
      return res.status(404).send({
        success:false,
        message:"Category not found"
      });
    }
    return res.status(200).send({
      success:true,
      message:"Category updated successfully",
      category
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Server Error",
      error:error.message
    })
    
  }
}

async function getCategoryController(req,res){
  try {
    const categories = await categorymodel.find({});
    return res.status(200).send({
      success:true,
      message:"Categories fetched successfully",
      categories
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Server Error",
      error:error.message
    });
  }
}

async function getSingleCategoryController(req,res){
  try {
    const {slug} = req.params;
    const category = await categorymodel.findOne({slug});
    if(!category){
      return res.status(404).send({
        success:false,
        message:"Category not found"
      });
    }
    return res.status(200).send({
      success:true,
      message:"Category fetched successfully",
      category
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Server Error",
      error:error.message
    });
  }
}

async function deleteCategoryController(req,res){
  try {
    const {id} = req.params;
    const category = await categorymodel.findByIdAndDelete(id);
    if(!category){
      return res.status(404).send({
        success:false,
        message:"Category not found"
      });
    }
    return res.status(200).send({
      success:true,
      message:"Category deleted successfully"
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Server Error",
      error:error.message
    });
  }
}

module.exports = {createCategoryController,updateCategoryController,getCategoryController,getSingleCategoryController,deleteCategoryController};