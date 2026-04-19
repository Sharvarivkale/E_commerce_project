const mongoose=require('mongoose');
const fs=require('fs')
const productmodel=require('../models/productmodel');
const categorymodel=require('../models/categorymodel');
const slugify=require('slugify')


// create for the form data
async function createproductController(req,res){
  try {
    const {name,slug,description,price,category,quantity,shipping}= req.fields;
    const {photo}= req.files;
    if(!name || !price || !category || !quantity ){
  return res.status(400).send({ message: "Required fields missing" });
  
 }
 if(photo && photo.size > 1024 * 1024){
   return res.status(400).send({ message: "Photo size should be less than 1MB" });
 }

    const newproduct=new productmodel({...req.fields,slug:slugify(name)});
     if(photo){
      newproduct.photo.data = fs.readFileSync(photo.path);
      newproduct.photo.contentType = photo.type;
    }
    await newproduct.save();
    res.status(201).json({
      success:true,
      message:"Product created successfully",
      data:newproduct
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Product creation failed",
      error:error.message
    });
  }
}
//get the all products
async function getProductsController(req,res){
  try {
    const products = await productmodel.find({}).select("-photo").populate("category").limit(12).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total: products.length,
      message: "Products retrieved successfully",
      data: products
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message
    });
  }
}
//get the single product
async function getSingleProductController(req,res){
  try {
    const { slug } = req.params;
    const product = await productmodel.findOne({ slug }).select("-photo").populate("category");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      error: error.message
    });
  }
}

async function getProductPhotoController(req,res){
  try {
    const product = await productmodel.findById(req.params.pid).select("photo");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    res.set("Content-Type", product.photo.contentType);
    res.status(200).send(product.photo.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product photo",
      error: error.message
    });
  }
}
//update the product
async function updateProductController(req,res){
  try {
    const {name,slug,description,price,category,quantity,shipping}= req.fields;
    const {photo}= req.files;
    if(!name || !price || !category || !quantity ){
  return res.status(400).send({ message: "Required fields missing" });
  
 }
 if(photo && photo.size > 1024 * 1024){
   return res.status(400).send({ message: "Photo size should be less than 1MB" });
 }

    const newproduct=await productmodel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});
     if(photo){
      newproduct.photo.data = fs.readFileSync(photo.path);
      newproduct.photo.contentType = photo.type;
    }
    await newproduct.save();
    res.status(201).json({
      success:true,
      message:"Product created successfully",
      data:newproduct
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Product creation failed",
      error:error.message
    });
  }

}
//delete product
async function deleteProductController(req,res){
  try {
    const product = await productmodel.findByIdAndDelete(req.params.pid);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message
    });
  }
}
async function productFiltersController(req, res) {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productmodel.find(args);
    res.status(200).send({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
}

async function productCountController(req, res) {
  try {
    const count = await productmodel.countDocuments();
    res.status(200).json({
      success: true,
      message: "Product count retrieved successfully",
      data: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product count",
      error: error.message
    });
  }
}


async function productListController(req, res) {
  try {
    const { page } = req.params;
    const products = await productmodel.find({})
      .select("-photo")
      .skip((page - 1) * 6)
      .limit(6)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Product list retrieved successfully",
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product list",
      error: error.message
    });
  }
}

async function searchProductController(req, res) {
  try {
    const { keyword } = req.params;
    
    // Find categories that match the keyword
    const categories = await categorymodel.find({
      name: { $regex: keyword, $options: "i" }
    });
    
    const categoryIds = categories.map(c => c._id);

    const results = await productmodel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { category: { $in: categoryIds } }
        ],
      })
      .select("-photo")
      .populate("category");

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
}

module.exports={createproductController,getProductsController,getSingleProductController,getProductPhotoController,updateProductController,deleteProductController,productFiltersController,productCountController,productListController,searchProductController}