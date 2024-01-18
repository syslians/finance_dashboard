import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
  
    const transactions = await Transaction.find()
    .limit(50) // 50개로 제한
    .sort({ createdOn: -1 });  // 최근 트랜잭션
    res.status(200).json(transactions);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
