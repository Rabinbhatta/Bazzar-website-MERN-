import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authroute from "./routes/auth.js"
import productroute from "./routes/products.js"
import orderroute from "./routes/orders.js"



/* CONFIGURATIONS  */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());








/* routes */
 app.use("/auth", authroute)
 app.use("/products",productroute)
 app.use("/orders",orderroute)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true)
mongoose
.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(()=>{
    app.listen(PORT, ()=>console.log(`server is listening in ${PORT}`));
})
.catch((error)=>{console.log(error)})


