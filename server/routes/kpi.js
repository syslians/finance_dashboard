import express from "express";
import KPY from "../models/KPY.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
  
    const kpis = await KPY.find();
    
    
    res.status(200).json(kpis);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
