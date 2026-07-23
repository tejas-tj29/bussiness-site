import Product from "../models/Product.module.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createProduct = async (req, res) => {
  try {

    const { image, companyCategory, category, order } = req.body;

    let imageUrl = "";

        // 2. req.file:
        // Yeh Multer se milta hai. Agar file upload hui hai, req.file exist karega.
        if (req.file) {
            // 3. Call Utility:
            // Hum RAM wala data (req.file.buffer) uploadToCloudinary ko bhej rahe hain.
            const cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
            
            if (cloudinaryResponse) {
                // 4. secure_url:
                // Cloudinary upload hone ke baad ek permanent link deta hai.
                imageUrl = cloudinaryResponse.secure_url;
            }
        }

    const newProduct = new Product({
      image:imageUrl,
      companyCategory,
      category,
      order: order ? Number(order) : 0,
    });

    // Committing the object layer securely into MongoDB cluster storage
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product cataloged successfully inside database!",
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to save product! Validation Error: ${error.message}`,
    });
  }
};

// 📤 2. READ: Fetches all products mapped under a specific company (GET Request)
export const getProductsByCompany = async (req, res) => {
  try {
    let { companyName } = req.params;
    
    companyName = companyName.replace(/-/g, " ");

    // Database mein regex se search karo taaki case ka koi issue na ho
    const products = await Product.find({ 
      companyCategory: { $regex: new RegExp(`^${companyName}$`, 'i') } 
    }).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error while fetching catalog: ${error.message}`,
    });
  }
};

// 🗑️ 3. DELETE: Removes a specific product using its Unique MongoDB Object ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extracts the target ID directly from the URL route parameter string

    // Querying database to find and remove the record document instantly
    const deletedItem = await Product.findByIdAndDelete(id);

    // 🔎 Safety Check: If id doesn't match any active record document
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Operation Aborted! Target product ID not found inside database.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product record successfully wiped out from database repository!",
      deletedData: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error during deletion tracking: ${error.message}`,
    });
  }
};

export const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
  }
};