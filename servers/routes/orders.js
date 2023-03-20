import { saveOrders,orders } from "../controllers/orders.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router =express.Router()

router.get("/:userId",orders)
router.post("/:userId",saveOrders)

export default router