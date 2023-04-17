import express,{json} from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser'
// import cookieParser from 'cookie-parser';
import  connectDB  from "./config/connectDB";
import routes from './routes';

const app = express()

config();
// //Ngăn chặn cors origin
app.use(cors())

// //Tạo cookie và gắn cookie ở token
app.use(cookieParser());

app.use(json())

//Connect DB
connectDB()

//Routes
routes(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// //AUTHENTICATION
// //AUTHORIZATION


