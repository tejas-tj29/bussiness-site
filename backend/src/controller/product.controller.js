import Product from "../models/Product.module.js";

export const createProduct = async (req, res) => {
  try {
    const { title, image, companyCategory, specifications } = req.body;

    // Creating a fresh structured object following hmara Mongoose Schema rulebook
    const newProduct = new Product({
      title,
      image, // In future, this string will come via Cloudinary upload pipeline
      companyCategory,
      specifications,
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
    const { companyName } = req.query; // Extracts key filters from query params string (?companyName=...)

    let queryFilter = {};
    if (companyName) {
      queryFilter.companyCategory = companyName;
    }

    // Dynamic database search using hmara optimized schema indexing wire
    const productsList = await Product.find(queryFilter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: productsList.length,
      data: productsList,
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