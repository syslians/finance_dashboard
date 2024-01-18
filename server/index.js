import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan  from "morgan";
import kpiRoutes from "./routes/kpi.js"
import KPY from "./models/KPY.js";  
import { kpis, products, transactions } from "./data/data.js";
import productRoutes from "./routes/product.js";
import Product from "./models/Product.js";  
import Transaction from "./models/Transaction.js";
import transactionRoutes from "./routes/transaction.js";

/* express: 웹서버 프레임워크, body-parser: 요청 본문을 파싱하는 미들웨어, mongoose: MongoDB와의 연결을 위한 ODM(Object Document Mapper)
  cors: CORS(Cross-Origin Resource Sharing)설정을 위한 미들웨어, dotenv: 환결설정을 로드하는 모듈, helmet: 웹 어플리케이션의 보안을 위한 미들웨어
  morgan: 로그를 기록하는 미들웨어, kpiRoutes, productRoutes, transactionRoutes: API 라우트가 정의된 파일, KPY, Product, Transaction: Mongoose 모델이 정의된 파일
  kpis, products, transactions: 초기 데이터가 포함된 파일
*/


/*CONFIGURATION*/
dotenv.config(); // 환경변수 로드
const app = express(); // Express 앱 생성
// 미들웨어 적용
app.use(express.json()); 
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES 엔드포인트 정의. 해당 엔드포인트로 요청이 들어온다면 두번째 인자에 정의된 라우트 파일로 라우팅. */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* mongoose setup */
const mongo = "mongodb+srv://tonynala97:gu56417974@cluster0.3gdvazf.mongodb.net/?retryWrites=true&w=majority"
const PORT = 8080;

console.log(mongo)
console.log(PORT)

/* mongoose로 몽고디비에 커넥션 시도. connect 성공시 .then에 정의된 콜백 실행.(server Port 출력) */
mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useMongoClient: true
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase();
    // KPY.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
    
  })
  .catch((error) => console.log(`${error} did not connect`));