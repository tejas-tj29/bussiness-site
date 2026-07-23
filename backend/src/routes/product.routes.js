import {Router} from 'express';
import {upload} from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

import { createProduct, getProductsByCompany, deleteProduct, updateProductCategory } from "../controller/product.controller.js";

router.post("/add", verifyJWT, upload.single("image"), createProduct);  
router.put("/update-category/:id", verifyJWT, updateProductCategory);   
router.get("/:companyName", getProductsByCompany); 
router.delete("/remove/:id", verifyJWT, deleteProduct);

export default router;