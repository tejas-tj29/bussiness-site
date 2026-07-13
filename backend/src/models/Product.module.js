import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Product name title is mandatory"],
      trim: true,
    },
    image: {
      type: String,
      default: "", // Will hold the secure Cloudinary string web link URL
    },
    companyCategory: {
      type: String,
      required: [true, "Principal parent brand mapping name is mandatory"],
      // Strict indexing optimization for faster lookups when user toggles parent buttons
      index: true, 
    },
},{timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;