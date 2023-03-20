import  express  from "express";
import { addproduct,getProduct } from "../controllers/products.js";

const router = express.Router()

router.post("/", addproduct)
router.get("/products", getProduct)
export default router