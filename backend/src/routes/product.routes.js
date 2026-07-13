import {Router} from 'express';

const router = Router();

import { createProduct, getProductsByCompany, deleteProduct } from "../controller/product.controller.js";

router.post("/add", createProduct);     
router.get("/all", getProductsByCompany); 
router.delete("/remove/:id", deleteProduct);

export default router;