import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/Index.js';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/',mainRouter);

app.listen(3000,()=>{
    console.log("Server Started!")
})