import express from "express";
import KPY from "../models/KPY.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    // 모든 KPI 데이터 조회. KPYSchema의 model(mongoose.model의 인스턴스) 속성을 참조하여 find메서드 호출
    const kpis = await KPY.find();
    
    // 
    res.status(200).json(kpis);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
