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


/*CONFIGURATION*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

console.log("hello");

/* mongoose setup */
const mongo = "mongodb+srv://tonynala97:gu56417974@cluster0.3gdvazf.mongodb.net/?retryWrites=true&w=majority"
const PORT = 8080;
console.log(mongo)
console.log(PORT)
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