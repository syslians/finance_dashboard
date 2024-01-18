import mongoose from "mongoose";
import { loadType } from "mongoose-currency";


const Schema = mongoose.Schema;
loadType(mongoose); // mongoose의 currency type 로드.

// Schema 정의(data model 정의)
const daySchema = new Schema(
  {
    date: String, // 날짜
    revenue: {
      type: mongoose.Types.Currency, // Currency Type
      currency: "USD", 
      get: (v) => v / 100, // 센트 단위 값을 달러 단위로 변환. 나누기 100해줘야 함
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } } // JSON으로 변환 시 getter 함수 포함
);

const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } }
);

const KPYSchema = new Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
    },
    monthlyData: [monthSchema], // 월별 데이터 배열
    dailyData: [daySchema], // 일별 데이터 배열
  },
  { timestamps: true, toJSON: { getters: true } } // 생성 시간 자동 추가
);

const KPY = mongoose.model("KPY", KPYSchema); // KPY 모델 생성

export default KPY;
